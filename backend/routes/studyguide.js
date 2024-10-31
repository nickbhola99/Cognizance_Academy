import express from 'express'
import User from '../models/UserAccounts.js'
import FlashCards from '../models/FlashCards.js'
import StudyGuide from '../models/StudyGuide.js'
import verifyToken from '../utils/authorization.js'


const router = new express.Router()

router.post("/byusername/:username", verifyToken, async (req, res, next) => {
    try{
        console.log(req.body);
        const {title, description, topics} = req.body;
        const user = await User.find({username: req.user.username})
        // const newguide = await StudyGuide.create({...req.body, createdBy: req.user.username})
        const newGuide = new StudyGuide({
            title,
            description,
            topic: topics,
            createdBy: req.user.username
        })
        await newGuide.save();

        console.log(newGuide);
        
        res.send(newGuide)
    } catch(error){
        console.log(error);
    }
})

router.post("/:id", verifyToken, async (req, res, nest) => {
    try{
        console.log(req.user.username);
        
        const user = await User.findById(req.params.id);
        const newguide = await StudyGuide.create({...req.body, createdBy: user.username})
        res.send(newguide)
    } catch(error){
        console.log(error);
    }
})

router.get('/', verifyToken, async (req, res, next) => {
    try {
        const studyguide = await StudyGuide.find();
        res.send(studyguide)
      } catch (error) {
        console.log(error);
        next(error);
      }
})

router.get('/byid/:id', verifyToken, async (req, res, next) => {
    try {
        const studyguide = await StudyGuide.findById(req.params.id);
        res.send(studyguide)
      } catch (error) {
        console.log(error);
        next(error);
      }
})

router.get('/byusername/:username', verifyToken, async (req, res, next) => {
    try {
        const studyguide = await StudyGuide.find({createdBy: req.params.username});
        res.send(studyguide)
      } catch (error) {
        console.log(error);
        next(error);
      }
})
router.get("/byid/:id/cards", async (req, res, next) => {
    try {
        const studyguide = await StudyGuide.findById(req.params.id);
        console.log(studyguide);
        if (!studyguide){
            return res.status(404).json({message: `No Study Guide found: ${req.params.id}`});
        }
        const flashcard = await FlashCards.create(req.body);
        if (flashcard){
            studyguide.cards.push(flashcard);
            await studyguide.save();
            res.status(201).json({studyguide});
        }
        else {
            res.status(400).json({message: "Failed to add new flashcard"});
        }
        
    } catch (error) {
        next(error);
    }
})

router.post("/byid/:id/cards", verifyToken, async (req, res, next) => {
    try {
        const studyguide = await StudyGuide.findById(req.params.id);
        console.log(studyguide);
        if (!studyguide){
            return res.status(404).json({message: `No Study Guide found: ${req.params.id}`});
        }
        const flashcard = await FlashCards.create(req.body);
        if (flashcard){
            studyguide.cards.push(flashcard);
            await studyguide.save();
            res.status(201).json({flashcard});
        }
        else {
            res.status(400).json({message: "Failed to add new flashcard"});
        }
        
    } catch (error) {
        next(error);
    }
})

router.get('/byid/:id/:cardid', verifyToken, async (req, res, next) => {
    try {
        const studyguide = await StudyGuide.findById(req.params.id);
        const card = await studyguide.cards.id(req.params.cardid);
        res.send(card)
      } catch (error) {
        console.log(error);
        next(error);
      }
})

router.delete('/byid/:id/:cardid', verifyToken, async (req, res, next) => {
    try {
        const deletedCard = await FlashCards.findByIdAndDelete(req.params.cardid);
        const studyguide = await StudyGuide.findById(req.params.id);
        if (studyguide) {
            studyguide.cards.pull(req.params.cardid);
            await studyguide.save();
        }
        res.send({
            deleted: deletedCard,
            message: 'Flash Card has been deleted.'
        })
      } catch (error) {
        console.log(error);
        next(error);
      }
})

router.put('/byid/:id/:cardid', verifyToken, async (req, res, next) => {
    try {
        const id = req.params.cardid;
        console.log(req.body);
        console.log(id);
        const newcard= await FlashCards.findByIdAndUpdate(
            id,
            req.body,
            { new: true } 
          );
                res.send({
            newcard,
            message: `Flash Card ${id} Updated `
        })
        // const {title, backInfo} = req.body;
        // console.log(title);
        
        // const flashcard = await FlashCards.findById(req.params.cardid);
        // console.log(flashcard);
        
        // if (!flashcard) {
            
        //     return res.status(404).send({ message: 'Flashcard not found' });
        // }
        
        // if (title !== undefined && title.trim() !== ''){
        //     flashcard.title = title;
        // }
        // if (backInfo !== undefined && backInfo.trim() !== ''){
        //     flashcard.backInfo = backInfo;
        // }
        // const newcard = await flashcard.save();
        // res.send({
        //     newcard,
        //     message: `Flash Card ${id} Updated `
        // })
        // const updatedCard = await FlashCards.findByIdAndUpdate(id, update, {
        //     new: true,
        // })

      } catch (error) {
        console.log(error);
        next(error);
      }
})

export default router;