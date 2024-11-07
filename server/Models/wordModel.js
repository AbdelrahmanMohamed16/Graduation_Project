const mongoose = require("mongoose");
const { Schema } = mongoose;

// coneect to DB
mongoose
  .connect(process.env.DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(`DB Connected Succssfully`);
  });

const diacritics = new Schema({
  word_with_diacritics: String,
  phonetic_writing: String,
  pronounciation: String,
});

const morphological_info = new Schema({
  root: String,
  word_class: {
    type: String,
    enum: {
      values: ["جمع تكسير", "مفرد", "مثني"],
      message: "word_class is enums",
    },
  },
  morphological_form: {
    type: String,
    enum: {
      values: ["عام"],
      message: "morphological_form is enums",
    },
  },
  linguistic_level: {
    type: String,
    enum: {
      values: ["فصيح", "عامي"],
      message: "linguistic_level is enums",
    },
  },
});

const collocate = new Schema({
  collocate_text: String,
  meaning: String,
  example: [
    {
      text: String,
      source: String,
    },
  ],
});

const meaning = new Schema({
  text: String,
  image: {
    url: String,
    description: String,
    source: String,
  },
  example: [
    {
      text: String,
      source: String,
    },
  ],
});

const semantic_info = new Schema({
  // TODO  => Set enum
  Semantic_fields: [String],
  meaning: meaning,
  collocates: [collocate],
  completed: Boolean,
});

const Word = new Schema({
  text: {
    type: String,
    required: true,
  },
  diacritics: [diacritics],
  morphological_info: morphological_info,
  semantic_info: [semantic_info],
  state: {
    type: String,
    enum: {
      values: ["قيد التحرير", "قيد المراجعة"],
      message: "حالة البطاقة يجب ان تكون قيد التحرير او المراجعة",
    },
  },
  notes: String,
});

const WordModel = new mongoose.model("Word", Word);
module.exports = WordModel;
