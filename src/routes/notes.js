const router = require('express').Router();
const Note = require('../models/Note');


router.get('/notes/add', (req, res) => {
    res.render('notes/newNote');
});

router.post('/notes/newNote', async(req, res) => {
    const { title, description } = req.body;
    let errors = [];
    if (!title) {
        errors.push({ text: 'Please entry a Title' });
    }
    if (!description) {
        errors.push({ text: 'Please entry a Description' });
    }
    if (errors.length > 0) {
        res.render('notes/newNote', {
            errors,
            title,
            description
        })
    } else {
        const newNote = new Note({title, description});
        //console.log(newNote);
        await newNote.save();
        res.redirect('/notes');
    }
})


router.get('/notes', async(req, res) => {
    const notes = await Note.find().lean().sort({date: 'DESC'}); 
    res.render('notes/allNotes', {notes});
});
module.exports = router;