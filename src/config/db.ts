import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDatabase = async (): Promise<void> => {
    try{
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/SCIOTS-energetica-e');
        console.log('Connexión exitosa con MongoDB');
  
        // Manejadores de eventos para la conexión a MongoDB
        mongoose.connection.on('connected', () => {
        console.log('Mongoose connectado a la base de datos');
        });
    
        mongoose.connection.on('error', (err) => {
        console.error('Error en la connexión de Mongoose:', err);
        });
    
        mongoose.connection.on('disconnected', () => {
        console.log('Mongoose desconnectado de la base de datos');
        });
    
        // Manejador para cerrar la conexión cuando se detiene la aplicación
        process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('Connexión de Mongoose cerrada debido a la finalización del programa');
        process.exit(0);
        });
      }
    catch(error){
      console.error('Error de connexión con MongoDB:', error);
      console.error("Asegúrate de que MongoDB se está ejecutando en el sistema.");
      throw error;
    }
};

export default connectDatabase;