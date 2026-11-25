export type ExcaliburMessages = {
  hero: {
    title: string;
    subtitle1: string;
    subtitle2: string;
    image: string
    bgGraphic: string;
    icon: string;
  };
  intro: { title: string; paragraph: string };
  workflow: { title: string; subtitle: string; image: string };
  features: {
    title: string;
    items: Array<{ title: string; desc: string; icon: string }>;
  };
  how: {
    title: string;
    steps: Array<{ number: string; title: string; desc: string }>;
    noteTitle: string;
    noteDesc: string;
  };
};
