const user=require('../models/UserModel');

// get user
 exports.getUser= async (req,res,next)=>{
    id_user=req.params.id_user;
    const ress= await user.getUser(id_user);
    rows = ress[0];
    if(rows.length !== 0)
    {
         res.json({
            succes: true,
            user: rows,
        });

    } else 
     {
        res.json({
            succes: false,
            message: 'aucune utilisateur',
        });
     }
    }


    // invite 
     exports.InvitUser= async (req,res,next)=>{

    lastName =req.body.lastName;
    firstName  =req.body.firstName ;
    email  =req.body.email ;
    type  =req.body.type ;
    invitation  ="Pending";
    let date_ob = new Date();
    creationDate  =date_ob;
    id_classe=req.body.id_classe ;

  

    const ress= await user.InvitUser(lastName ,firstName ,email,type ,invitation ,creationDate,id_classe);
    rows = ress[0];
    console.log("rowss ",rows)
    if(rows.length !== 0)
    {
        res.json({
            succes:true,
            message: 'ajouter avec succès',
                 })  

    } else 
     {
        res.json({
            succes: false,
            message: 'erreur lors de l ajout ',
        });
     }
    }

   // Inscri user
 exports.InscriUser= async (req,res,next)=>{

    id_user=req.params.id_user;
   // photo  =req.body.photo ;
    phone  =req.body.phone ;
    birthDate  =req.body.birthDate ;
    pwd  =req.body.pwd;
    invitation  ="Accomplished";
   

  

    const ress= await user.InscriUser(phone,birthDate,pwd,invitation,id_user);
    rows = ress[0];
    console.log("rowss ",rows)
    if(rows.length !== 0)
    {
        res.json({
            succes:true,
            message: 'Modifier avec succès',
                 })  

    } else 
     {
        res.json({
            succes: false,
            message: 'erreur lors de la modification ',
        });
     }
    }

     // cancel Invitation
 exports.CancelInvitation= async (req,res,next)=>{

    id_user=req.params.id_user;
    invitation  ="Canceled";
   
    const ress= await user.CancelInvitation(invitation,id_user);
    rows = ress[0];
    console.log("rowss ",rows)
    if(rows.length !== 0)
    {
        res.json({
            succes:true,
            message: 'Modifier avec succès',
                 })  

    } else 
     {
        res.json({
            succes: false,
            message: 'erreur lors de la modification ',
        });
     }
    }