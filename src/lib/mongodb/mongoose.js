


// ЭТО КОД ДЛЯ СОЕДИНЕНИЯ с MONGODB ATLAS
// соединяет каждый раз через connect() в других файлах с MongoDB Atlas когда хотим отправить какую-то информацию или сделать что-то


import mongoose from 'mongoose';

let initialized = false;

export const connect = async () => {

  mongoose.set('strictQuery', true);

  if (initialized) {
    console.log('Already connected to MongoDB yes777');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // название базы данных с которой соединиться в MongoDB Atlas ==> next-blog
      dbName: 'next-blog',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB 777');
    initialized = true;

  } catch (error) {
    console.log('Error connecting to MongoDB 999:', error);
  }
};