const yup = require("yup");

const userSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});
const signInSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});
const projectSchema = yup.object({
  name: yup.string().required(),
});
const taskSchema = yup.object({
  projectId: yup.string().required(),
  content: yup.string().required(),
  description: yup.string().required(),
});
const commentSchema = yup.object({
  taskId: yup.string().required(),
  projectId: yup.string().required(),
  content: yup.string().required(),
});
const labelSchema = yup.object({
  name: yup.string().required(),
  taskId: yup.string().required(),
});
const deleteLabelSchema = yup.object({
  taskId: yup.string().required(),
});
module.exports = {
  userSchema,
  signInSchema,
  projectSchema,
  taskSchema,
  commentSchema,
  labelSchema,
  deleteLabelSchema,
};
