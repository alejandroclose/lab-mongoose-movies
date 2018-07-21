const express = require('express');
const Celebrity = require('../models/celebrity')
const router = express.Router();

router.get('/',(req, res, next) => {
  Celebrity.find({})
  .then((celebrities) => {
    console.log(celebrities.length)
    res.render('celebrities/index', { celebrities });
  })
  .catch((error)=>{
    next(error);
  })
});

router.get('/new', (req, res, next) => {
  res.render('celebrities/new');
})

router.post('/', (req, res, next) => {
  const {name, occupation, catchPhrase} = req.body;
  celebrity = new Celebrity({name, occupation, catchPhrase});
  celebrity.save()
  .then(() => {
    res.redirect('/celebrities');
  })
  .catch((error) => {
    res.redirect('/celebrities/new')
  }) 
});

router.get('/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
  .then((celebrity) => {
    res.render('celebrities/show', celebrity)
  })
  .catch((error) => {
    next(error);
  })
});

router.post('/:id/delete', (req, res, next) => {
  const {id} = req.params;
  Celebrity.findByIdAndRemove(id)
  .then(() => {
    console.log('Se ha borrado directamente')
    res.redirect('/celebrities');
  })
  .catch((error) => {
    next(error);
  })
});

router.get('/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id)
  .then((celebrity) => {
    res.render('celebrities/edit', celebrity)
  })
  .catch((error) => {
    next(error);
  })
});

router.post('/:id/update', (req,res,next)=>{
  const {id} = req.params;
  const {name, occupation, catchPhrase} = req.body

  Celebrity.findByIdAndUpdate(id, {name, occupation, catchPhrase})
  .then((response)=>{
    res.redirect('/celebrities');
  })
  .catch((err)=>{
    next(err);
  });
});


module.exports = router;


