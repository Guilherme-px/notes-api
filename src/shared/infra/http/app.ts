import express from 'express';
import cors from 'cors';
import notesRoutes from '../../../module/notes/routes/NoteRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/notes', notesRoutes);

export { app };
