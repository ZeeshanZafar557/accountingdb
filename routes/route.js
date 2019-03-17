const express = require('express');
var router = express.Router();
const User = require('../modles/user');
const Expence= require('../modles/expence');
const Income= require('../modles/income');
// register api  starts
router.post('/signup', (req, res, next) => {
    const { body } = req;
    console.log('body', body);
    var {   
        name,
        email,
        number,
        password,
        user_type
    } = body;
    if (!name) {
        return res.send({
            success: false,
            message: 'Error: Missing Name'
        });
    }
    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Missing Email'
        });
    }
    if (!number) {
        return res.send({
            success: false,
            message: 'Error: Missing Phone number'
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Missing Password'
        });
    }
    if (!user_type) {
        return res.send({
            success: false,
            message: 'Error:mention user Type'
        });
    }

    email = email.toLowerCase();
    User.find ( {
        Email: email
    }, (err, previousUser) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error : Server Error'
            });
        }
        else if (previousUser.length > 0) {
            return res.send({
                success: false,
                message: 'Error : Try Different email already register'
            });
        }
        console.log(previousUser.length);
        const newUser = new User();
        newUser.Email = email;
        newUser.password = password;
        newUser.Name = name;
        newUser.Number = number;
        newUser.user_type = user_type;
        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error : Server Error'
                });

            }
            else {
                return res.send({
                    success: true,
                    message: ' Account Created'
                });
            }

        })
    });
});
// register api  ends

//login api starts
router.post('/signin', (req, res, next) => {

    const { body } = req;
    console.log('body', body);
    const {
        password
    } = body;
    let {
        email
    } = body;

    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Missing email'
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: password'
        });
    }
    //console.log(email);
    email = email.toLowerCase();

    User.find({
        Email: email,
        password:password
    }, (err, users) => {
        if (err) { // console.log(err);
            return res.send({
                success: false,
                message: 'Error : In Connection'
            });

        }
        console.log(users.length);
        if (users.length != 1) {
            console.log(users.length);

            return res.send({
                success: false,
                message: 'Error : Invalid Email or Password'
            });

        }
        else
        {
            return res.send({
                success: true,
                message: 'Succefully Login',
                User:users
            }); 
        }
    });


});
//login api ends

//add expence starts
router.post('/addexpence', (req, res, next) => {
    const { body } = req;
    console.log('body', body);
    var {   
        amount,
        type,
        user_id
    } = body;
    if (!amount) {
        return res.send({
            success: false,
            message: 'Error: Missing amount'
        });
    }
    if (!type) {
        return res.send({
            success: false,
            message: 'Error: Missing expence type'
        });
    }
    if (!user_id) {
        return res.send({
            success: false,
            message: 'Error: Missing user id kindly sigin again'
        });
    }
 

     
        const newExpence = new Expence();
        newExpence.amount = amount;
        newExpence.type = type;
        newExpence.user_id = user_id;
        newExpence.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error : Server Error'
                });

            }
            else {
                return res.send({
                    success: true,
                    message: ' Expence Added'
                });
            }

        })

});
//add expence ends

//showing expences start
router.get('/show_expences/:id',(req,res,next)=>{
   
    Expence.find({
        user_id:req.params.id
    }).then(function(expneces){
     if(expneces.length<=0)
     {
        return res.send({
            success: false,
            message: 'No record exist',
        }); 
     }
      
        return res.send({
            success: true,
            message: 'Expences Exist',
            expencesrecord:expneces.reverse()
        }); 

    });
 
});
//showing expences ends

//update expence start
router.put('/updateexpence/:id',(req,res,next)=>{
    const { body } = req;
    const {
        amountf,
        typef
    } = body;
    if (!amountf) {
        return res.send({
            success: false,
            message: 'Error: Missing amount'
        });
    }
    if (!typef) {
        return res.send({
            success: false,
            message: 'Error: Missing expence type'
        });
    }
    Expence.findByIdAndUpdate({_id:req.params.id},{amount:amountf,type:typef}).then(function(room){
        return res.send({
            success: true,
            message: 'data updated',
        }); 
    
    });
 
});
//update expence ends

//add income start
router.post('/addincome', (req, res, next) => {
    const { body } = req;
    console.log('body', body);
    var {   
        amount,
        type,
        user_id
    } = body;
    if (!amount) {
        return res.send({
            success: false,
            message: 'Error: Missing amount'
        });
    }
    if (!type) {
        return res.send({
            success: false,
            message: 'Error: Missing expence type'
        });
    }
    if (!user_id) {
        return res.send({
            success: false,
            message: 'Error: Missing user id kindly sigin again'
        });
    }
 

     
        const newIncome = new Income();
        newIncome.amount = amount;
        newIncome.type = type;
        newIncome.user_id = user_id;
        newIncome.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error : Server Error'
                });

            }
            else {
                return res.send({
                    success: true,
                    message: ' Expence Added'
                });
            }

        })

});
//add income ends

//showing expences start
router.get('/show_income/:id',(req,res,next)=>{
   
    Income.find({
        user_id:req.params.id
    }).then(function(income){
     if(income.length<=0)
     {
        return res.send({
            success: false,
            message: 'No record exist',
        }); 
     }
      
        return res.send({
            success: true,
            message: 'Expences Exist',
            incomerecord:income.reverse()
        }); 

    });
 
});
//showing expences ends

//showing sum of incomes
router.get('/aggerate/:id',(req,res,next)=>{

   Expence.aggregate([{
     $match : { user_id :req.params.id } },
    {
          $group: {
            _id: "$type",
              price: {
                $addToSet: "$amount"
            }
        }
    }
    ], function (err, count) {
   
        if (err) {
            next();
            console.log(err);
        }
        if(count.length<=0)
        {
           return res.send({
               success: false,
               message: 'No record exist',
           }); 
        }
        return res.send({
            success: true,
            message: 'Expences Exist',
            records:count
        });
    });
});
//showing sum of income end
// get monthly earnings

//showing income
//showing sum of incomes
router.get('/aggerateicome/:id',(req,res,next)=>{

    Income.aggregate([{
      $match : { user_id :req.params.id } },
     {
           $group: {
             _id: "$type",
               price: {
                 $addToSet: "$amount"
             }
         }
     }
     ], function (err, count) {
    
         if (err) {
             next();
             console.log(err);
         }
         if(count.length<=0)
         {
            return res.send({
                success: false,
                message: 'No record exist',
            }); 
         }
         return res.send({
             success: true,
             message: 'Expences Exist',
             records:count
         });
     });
 });
//showing income

//show all user
router.get('/showusers', (req, res, next) => {
    User.find(function (err, users) {
        //  res.send('retervicng contact list');
        if(err)
        {
            return res.send({
                success: false,
                message: 'Error something went wrong',
            });
        }
        else if(users.length<=0)
        {
            return res.send({
                success: false,
                message: 'Currently no users',
            });
        }
        else
        {
            return res.send({
                success: true,
                message: 'user exist',
                records:users
            });
        }
    })
});
module.exports = router;