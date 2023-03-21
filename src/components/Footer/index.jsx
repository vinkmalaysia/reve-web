import { Poppins } from 'next/font/google';

const poppinsFont = Poppins({
  weight: '400',
  subsets: ['latin'],
});

export default function Footer () {
  return (
    <footer>
      &copy;&nbsp;Reve Interior Design&nbsp;&nbsp;&nbsp;Contact:&nbsp;&nbsp;&nbsp;reve_interior@gmail.com&nbsp;&nbsp;&nbsp;018-9857161
      <style jsx>
        {`
        footer {
          font-family: ${poppinsFont.style.fontFamily}, 'Segoe UI Light', 'Arial', sans-serif;
          position: absolute;
          font-size: 0.6rem;
          padding: 12px;
          bottom: 0;
          color: #eee;
        }
      `}
      </style>
    </footer>
  );
}
