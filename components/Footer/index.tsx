import Image from 'next/image';
import logoWhite from '@/public/svg/logo-white-icon.svg';

function Footer() {
  return (
    <div className="bg-[#001A1A]">
      <div className="px-3 py-5 wrapper">
        <Image src={logoWhite} alt="logo" />
      </div>
    </div>
  );
}

export default Footer;
