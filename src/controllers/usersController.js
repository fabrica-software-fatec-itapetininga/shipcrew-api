module.exports = {
  signin(req, res) {
    res.status(200).send({
      mensagem: 'Usando o GET da rota de cruds',
    });
  },

  index(req, res) {
    res.status(200).send({
      mensagem: 'Usando o GET da rota de cruds',
    });
  },

  show(req, res) {
    const id = req.params.id_crude;
    if (id === 'especial') {
      res.status(200).send({
        mensagem: 'usando o GET de um unico CRUD',
        id: id,
      });
    } else {
      res.status(200).send({
        mensagem: 'você passou um ID',
      });
    }
  },

  store(req, res) {
    const curso = {
      nome: req.body.nome,
      preco: req.body.preco,
    };

    res.status(201).send({
      mensagem: 'Usando o POST da rota de crud',
      cursoCriado: curso,
    });
  },

  update(req, res) {
    res.status(201).send({
      mensagem: 'Usando o PATCH da roda de crud',
    });
  },

  destroy(req, res) {
    res.status(201).send({
      mensagem: 'Usando o DELETE da roda de crud',
    });
  },
};
