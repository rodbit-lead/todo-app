import { Schema, model, Document } from 'mongoose';

export interface Todo extends Document {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

const TodoSchema = new Schema<Todo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

export default model<Todo>('Todo', TodoSchema)
