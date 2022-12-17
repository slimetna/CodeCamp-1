export interface Term {
  term: {
    id: Number;
    target_name: String;
    term_name: String;
    learning_start: String;
    learning_end: String;
    learningduration: Number;
    promo: String;
    spe: String;
    wall_name: String;
  };

  students: Student[];
}

export interface Student {
  login: String;
  firstname: String;
  lastname: String;
}
