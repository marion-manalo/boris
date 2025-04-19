import Welcome from "./Welcome";
import './Splash.css';
import borisStyle from '@/assets/boris-style.png';
import boris from '@/assets/boris.png';
import dash from '@/assets/Dashboard.png';
import ImageSlide from './ImageSlide/ImageSlide';

const Splash = () => {
  const imageItems = [
    {
      image: borisStyle,
      title: '',
      description: '',
    },
    {
      image: dash,
      title: 'Step 1',
      description: 'Generate reports with real-time financial data.',
    },
    {
      image: borisStyle,
      title: 'Step 2',
      description: 'Track company performance with interactive charts.',
    },
    {
      image: borisStyle,
      title: 'Step 3',
      description: 'Easily share with investors and collaborators.',
    },
    {
      image: boris,
      title: 'Step 4',
      description: 'Build tailored metrics with intuitive tools.',
    },
  ];

  return (
    <div className="splash-container">
      <Welcome />
      <ImageSlide items={imageItems} />
    </div>
  );
};

export default Splash;
