const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const auth = require('./routes/authRoutes')
const item = require('./routes/itemRoutes')
const list = require('./routes/listRoutes')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/auth', auth);
app.use('/api/item', item);
app.use('/api/list', list);


const dbURI = 'mongodb+srv://organizedNotes5:OrganizedNotes321@organizednotescluster.nejauvm.mongodb.net/organizedNotes?retryWrites=true&w=majority';
mongoose.connect(dbURI).then((result) => {
    app.listen(5000, () => {
        console.log('Server is listening on port 5000...');
    });
}).catch((err) => console.log(err));



