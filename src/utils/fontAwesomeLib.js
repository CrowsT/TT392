import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheckSquare,
  faCoffee,
  faLink,
  faImage,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

const faLib = {
  loadFa: () => {
    library.add(faCheckSquare, faCoffee, faLink, faImage, faTimes);
  },
};

export default faLib;
