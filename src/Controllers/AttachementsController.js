const attachments=require('../models/AttachementsModel');


  // ajout attachments 


  exports.save= async (req,res,next)=>{

    name =req.body.name;
    let date_ob = new Date();
    creationDate  =date_ob;
    id_chapitre=req.body.id_chapitre;


  

    const ress= await attachments.save(name,creationDate,id_chapitre);
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


    // Modifier attachments 
exports.put= async (req,res,next)=>{

id_attach=req.params.id_attach;
name =req.body.name;
let date_ob = new Date();
creationDate  =date_ob;
id_chapitre=req.body.id_chapitre;





const ress= await attachments.put(name,creationDate,id_chapitre,id_attach);
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