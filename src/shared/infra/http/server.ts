import { app } from './app';

app.listen(process.env.PORT || 3333, () =>
    console.log('Server listen, port 3333'),
);
