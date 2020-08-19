const express = require ('express');
const uuid = require ('uuid'); // bringing the package which generates random IDs for us.
const router = express.Router();
const members = require('../../members');//extracting the data of members from a seperate file

// get all the three members .
router.get('/',(req,res) => {
    res.json(members);
});

//get a single member.
router.get('/:id',(req,res) =>{
    //res.send(req.params.id)
    /*The some() method tests whether at least one element in the array passes the test implemented by 
    the provided function. It returns a Boolean value.*/
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
})

//create member
router.post('/', (req,res) => {
    const newMember ={
        id: uuid.v4(),
        name : req.body.name, //it will get the same by form 
        email: req.body.email, //it will get the same by form 
        status: 'active'
    }
    
    if(!newMember.name || !newMember.email){
        res.status(400).json ({msg:'Please include a name and email'});
    }
    //members.save(newMember);
    members.push(newMember);
    //res.json(members); //after getting data by form entered by user it return json .
    res.redirect('/'); //after getting the data it will redirect user to same page .
});

//Update members :-
router.put('/:id',(req,res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name ? updmember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
            }
        });
    } 
    else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
})


// delete member
router.delete('/:id',(req,res) =>{

    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        res.json({
            msg: 'Member deleted',
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    } else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
})

module.exports = router; 