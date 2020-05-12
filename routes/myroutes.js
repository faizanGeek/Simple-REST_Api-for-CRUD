const express = require('express');
const router = express.Router();
const Pager = require('../models/page');

//getting all
router.get('/', async (req, res) => {
	try {
		const likers = await Pager.find();
		res.json(likers);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// getting one
router.get('/:id', getLiker, async (req, res) => {
	try {
		res.status(200).json(res.liker);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// creating one
router.post('/', async (req, res) => {
	const likers = new Pager({
		name: req.body.name,
		likerToPost: req.body.likerToPost,
	});
	try {
		const newLiker = await likers.save();
		res.status(201).json(newLiker);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// updating one
router.patch('/:id', getLiker, async (req, res) => {
	if (req.body.name != null) res.liker.name = req.body.name;
	if (req.body.likerToPost != null)
		res.liker.likerToPost = req.body.likerToPost;
	try {
		const updatedLiker = await res.liker.save();
		res.json(updatedLiker);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// deleting one
router.delete('/:id', async (req, res) => {
	let liker;
	try {
		liker = await Pager.findById(req.params.id);
		if (liker == null) {
			return res.status(404).json({ message: 'cannot find subscriber' });
		}
		try {
			await liker.remove();
			res.json('deleted liker');
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	// try {
	// 	await res.liker.remove();
	// 	res.json('deleted liker');
	// } catch (err) {
	// 	res.status(500).json({ message: err.message });
	// }
});

async function getLiker(req, res, next) {
	let liker;
	try {
		liker = await Pager.findById(req.params.id);
		if (liker == null) {
			return res.status(404).json({ message: 'cannot find subscriber' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
	res.liker = liker;
	next();
}
module.exports = router;
