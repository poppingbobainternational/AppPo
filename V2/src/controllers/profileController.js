const db = require('../../index');

exports.getProfile = async (req, res) => {
  try {
    const doc = await db.collection('empresa').doc('perfil').get();
    if (doc.exists) {
      res.render('perfil', { title: 'Configuración de Perfil', profile: doc.data() });
    } else {
      res.render('perfil', { title: 'Configuración de Perfil', profile: {} });
    }
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    res.status(500).send('Error al obtener el perfil.');
  }
};

exports.saveProfile = async (req, res) => {
  try {
    const { nombre, direccion, telefono, email } = req.body;
    await db.collection('empresa').doc('perfil').set({
      nombre,
      direccion,
      telefono,
      email,
    });
    res.redirect('/perfil');
  } catch (error) {
    console.error('Error al guardar el perfil:', error);
    res.status(500).send('Error al guardar el perfil.');
  }
};
