import { app } from './app';
import { config } from 'dotenv';

config({ path: '.env' });

const port = process.env.PORT || 3000;

app.listen(port, () => {});
