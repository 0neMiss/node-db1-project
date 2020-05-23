
const express = require('express');
const db = require('../data/dbConfig.js');
const router = express.Router();

// Knex uses a --> db.select('*').from('Tablename here') format for select operation
// Knex uses a --> db('Table Name').insert({ name: 'Seth', age: 26 }) format.

router.get('/', async (req, res) => {
    try {
        const accounts = await db('accounts');
        res.status(200).json(accounts);
    } catch (err) {
        res.status(500).json({ message: 'Could not retrieve accounts', error: err});
    }
});



router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
          const account = await db.select('*').from('accounts').where({ id });
          if (account) {
              res.status(200).json(account);
          }
        else {
          res.status(400).json({ message: 'The account with this ID could not be found.'});
        }
    }
    catch (err) {
        res.status(500).json({ message: 'There was a problem locating the account.', error: err});
    }
});

router.post('/', async (req, res) => {
    const accountData = req.body;
    console.log(req.body);

    try {
        if (!accountData.name || !accountData.budget) {
            res.status(400).json({ message: 'Please Fill out all requested fields'})
        }
        else {
        const account = await db('accounts').insert(accountData);
        res.status(201).json(account);}
        }
    catch (err) {
        res.status(500).json({ message: 'There was an error creating the account.', error: err});
    }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedAccount = req.body;
  console.log(updatedAccount);
  try {
        const account = await db("accounts").update(updatedAccount).where({ id });
        if (account) {
            res.status(200).json(account);
        }
      else {
        res.status(400).json({ message: 'An account with this ID does not exist.'});
      }
  }
  catch (err) {
      res.status(500).json({ message: 'The account could not be updated', error: err});
  }

})


router.delete('/:id', async (req, res) => {
const { id } = req.params;
try {
      const account = await db.del().where({ id });
      if (count) {
          res.status(200).json(`deleted: ${count}`);
      }
    else {
      res.status(400).json({ message: 'The account could not be deleted.'});
    }
}
catch (err) {
    res.status(500).json({ message: 'There was a problem deleting the account.', error: err});
}
})


module.exports = router;
