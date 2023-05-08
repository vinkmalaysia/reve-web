import { forwardRef } from 'react';
import Image from 'next/image';
import bp from '../../utils/breakpoints';

const projects = [
  '00656552.jpg',
  '012189569.jpg',
  '0231875216.jpg',
  '121703138781.jpg',
  '1272839351.webp',
  '147415785.jpg',
  '156132041.jpg',
  '31203879071.jpg',
  '3121851037.webp',
  '312872231.jpg',
  '32517140754.webp',
  '4011625306.webp',
  '4725087985.jpg',
  '48415028564.jpg',
  '570485520.jpg',
  '601730171.jpg',
  '630721097.jpg',
  '68778167.jpg',
  '719044985.jpg',
  '875623860.jpg',
  '90682486208.jpg',
  '97800870.jpg',
];

const PortfolioGrid = forwardRef(function PortfolioGrid ({ opened, ...props }, ref) {
  return (
    <section ref={ref} className="portfolioWrapper" {...props}>
      <div className="portfolioGrid" data-opened={opened}>
        {
          projects.map(id => (
            <div key={id}>
              <Image
                src={`/img/portfolio/${id}`}
                fill={true}
                style={{ objectFit: 'cover' }}
                alt="Project rendering"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ))
        }
      </div>
      <style jsx>{`
        .portfolioWrapper {
          color: black;
          padding: 16px;
          margin: 16px;
          margin-top: 160px;
          width: 100%;
          pointer-events: none;
        }

        .portfolioGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 500px));
          gap: 1.2rem;
          place-content: center;
          pointer-events: none;
          opacity: 0;
          transform: perspective(900px) rotateX(-45deg) scale(0.7);
          transition: all 600ms ease;
        }

        @media screen and (min-width: ${bp.lg}) {
          .portfolioGrid {
            gap: 2.4rem;
          }
        }

        .portfolioGrid[data-opened='true'] {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }


        @media screen and (min-height: 800px) {
          .portfolioGrid > div {
            height: 400px;
          }
        }

        .portfolioGrid > div {
          position: relative;
          background-color: rgba(17, 17, 17, 0.9);
          border-radius: 12px;
          padding: 6px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4),
          0px 6px 12px rgba(0, 0, 0, 0.1);
          transition: box-shadow 300ms ease, transform 300ms, background-color ease 300ms;
          width: 100%;
          height: 300px;
          pointer-events: auto;
          cursor: pointer;
        }

        .portfolioGrid > div:hover {
          background-color: rgba(40, 40, 40);
          box-shadow: none;
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
});

export default PortfolioGrid;
