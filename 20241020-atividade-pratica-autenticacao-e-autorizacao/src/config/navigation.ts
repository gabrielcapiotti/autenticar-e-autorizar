export interface NavigationType {
  key: string;
  label: string;
  url: string;
}

const navigation: NavigationType[] = [
  { key: 'home', label: 'Home', url: '/' },
  { key: 'students-create', label: 'Cadastrar Estudante', url: '/students/create' },
  { key: 'students', label: 'Lista de Estudantes', url: '/students' },
];

export default navigation;
