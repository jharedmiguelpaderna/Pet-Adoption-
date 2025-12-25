'use client';

import Image from "next/image";
import svgPaths from "./svg-2n5wpt9viu";
import imgAiArtABeautifulGoldenRetrieverSitsGracefullyOnAPristi9618340864Dd49F29F2B7Bf0731E16Ba1 from "../public/assets/3038732647f7a2f4ef35d0eec943bfc18bec27ba.png";
import img1734976654Ba38B9535C6459993D2F5F48Ade644A1 from "../public/assets/33fe1c12fb9300b55e1a37023b6a0d57e5179ec5.png";
import imgImg from "../public/assets/29d67a6cc5ed6b3d92276bfb1e7f1c8571915254.png";
import imgPetGroup from "../public/assets/a42bfe6a209503ced592d71ead7eef69072cc729.png";
import imgParrot from "../public/assets/9c7489a7f271f2c15edf4554883dd078a4fffa84.png";
import imgImg1 from "../public/assets/0802123cb9bef516bf139819b323b62a8e348b17.png";
import imgImg2 from "../public/assets/e4b9953388578d861d6630e7752225d0617495ae.png";
import imgImg3 from "../public/assets/6084de6b420c8d60dcd7cb68fbf1a28c9e6e5966.png";
import imgImg4 from "../public/assets/5a25806fc9d52f2f0689785d96141c7238dda6ad.png";
import imgImg5 from "../public/assets/080b69bffeae97822d480799835b009176a41e1d.png";
import imgImg6 from "../public/assets/f2f81ad6f8eb8ead39753937e8757c12de1a1ee7.png";
import imgImg7 from "../public/assets/5012bcfbeb1bd548b478ba1fedd6b42da74c58a9.png";
import imgImg8 from "../public/assets/33cdf045b4c25f2734ed0e88d3c81ef392d16160.png";
import imgCat2 from "../public/assets/88905c5686151d49c796445e19f768b8b028a4ca.png";
import imgCat1 from "../public/assets/91fbf72a46bcee75e377e8e8c1fb60b19d379e3e.png";
import imgImg9 from "../public/assets/5c2fcc138744d97304182601e6285c6062aac64d.png";
import imgImg10 from "../public/assets/31dc906398ce1c7f3a776476e90f59c63258692c.png";
import imgImg11 from "../public/assets/48d795b35b771a6018bfb42845e5861d84bb6791.png";
import imgImg12 from "../public/assets/5661815916cfb30387d8bd8c531c3e7d994bc73f.png";
import imgImg13 from "../public/assets/b705adb647b68e63cadc15647ff35d7aeb0b2469.png";
import imgImg14 from "../public/assets/2fb486170663bbb520fa09615db360c857e5c588.png";
import imgImg15 from "../public/assets/4fab6db74171cfb530ee5f908145b747b2c3cfa9.png";
import imgImg16 from "../public/assets/ae04ea1b8ac88dac5455004d3f89be756e3cdc68.png";
import imgImg17 from "../public/assets/28804283d3dfd1dd32e775b4ffe554518a8eeff5.png";
import imgImg18 from "../public/assets/f8c5870a25e935b0697d2e301ca95266f0c7d338.png";
import imgImg19 from "../public/assets/a43de8790251bbc63f2c42fa5d3a4e4499c9d9ce.png";
import imgImg20 from "../public/assets/377d111f2ca9b08f8f50373bcd24b316ada356ad.png";
import imgImgLabel from "../public/assets/5b86c75247330d40544c95141cd0aa5642b7a712.png";
import imgImgLabel1 from "../public/assets/c443645014d87620bc51e3fdfcbcdba5c4c755aa.png";
import imgImgLabel2 from "../public/assets/909fd6e2789164043ad24faa2e377b3ee562ad33.png";
import { AvailablePetsSlider } from "../components/AvailablePetsSlider";
import { OurImpact } from "../components/OurImpact";
import { useRouter } from "next/navigation";
import type { UserRole } from "../components/AuthPage";
import { PawPrint } from "lucide-react";

function Phone() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="phone">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="phone">
          <path d={svgPaths.p347dc00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconText() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Icon+ text">
      <Phone />
      <p className="font-['Poppins:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre">+379 871-8371</p>
    </div>
  );
}

function Mail() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mail">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mail">
          <path d={svgPaths.p1d50cd00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 6L12 13L2 6" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconText1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Icon+ text">
      <Mail />
      <p className="font-['Poppins:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre">rgarton@outlook.com</p>
    </div>
  );
}

function IconsText() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0" data-name="Icons+ text">
      <IconText />
      <IconText1 />
    </div>
  );
}

function MapPin() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="map-pin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="map-pin">
          <path d={svgPaths.pf087300} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2d59bff0} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconText2() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0" data-name="Icon+ text">
      <MapPin />
      <p className="font-['Poppins:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre">8592 Fairground St. Tallahassee, FL 32303</p>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#f8f9fa] box-border content-stretch flex items-start justify-between px-0 py-[24px] relative shrink-0 w-full" data-name="Header">
      <IconsText />
      <IconText2 />
    </div>
  );
}

function Group() {
  return (
    <div className="h-[24px] relative shrink-0 w-[29.273px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 24">
        <g id="Group">
          <path d={svgPaths.p36bf03f0} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p278b3300} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p2a5b3200} fill="var(--fill-0, black)" id="Vector_3" />
          <path d={svgPaths.p9434500} fill="var(--fill-0, black)" id="Vector_4" />
          <path d={svgPaths.p132aae80} fill="var(--fill-0, black)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Logo">
      <Group />
      <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre">Pet Shop</p>
    </div>
  );
}

function Text() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[10px] py-[4px] relative shrink-0" data-name="Text">
      <div aria-hidden="true" className="absolute border-[#fd7e14] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#fd7e14] text-[20px] text-nowrap whitespace-pre">Home</p>
    </div>
  );
}

function Text1() {
  const router = useRouter();
  
  return (
    <div 
      className="box-border content-stretch flex gap-[10px] items-center justify-center px-[10px] py-[4px] relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-300" 
      data-name="Text"
      onClick={() => router.push('/browse-pets')}
    >
      <p className="font-['Poppins:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre">Browse Pets</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[10px] py-[4px] relative shrink-0" data-name="Text">
      <p className="font-['Poppins:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre">About Us</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[10px] py-[4px] relative shrink-0" data-name="Text">
      <p className="font-['Poppins:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre">Contact Us</p>
    </div>
  );
}

function Menu() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center relative shrink-0" data-name="Menu">
      <Text />
      <Text1 />
      <Text2 />
      <Text3 />
    </div>
  );
}

function Search() {
  return (
    <div className="absolute left-[4px] size-[20px] top-[4px]" data-name="search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="search">
          <path d={svgPaths.p13ed8900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1382be80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconBg() {
  return (
    <div className="bg-black overflow-clip relative rounded-[50px] shrink-0 size-[28px]" data-name="Icon+bg">
      <Search />
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f8f9fa] box-border content-stretch flex gap-[8px] h-[40px] items-center pl-[16px] pr-[5px] py-[9px] relative rounded-[20px] shrink-0 w-[280px]" data-name="input">
      <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)]">Search products...</p>
      <IconBg />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-[#fd7e14] bottom-3/4 left-3/4 right-[-25%] rounded-[50px] top-[-25%]">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[51px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center justify-center p-[10px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[10px] text-center text-nowrap text-white whitespace-pre">0</p>
        </div>
      </div>
    </div>
  );
}

function Heart() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="heart">
      <div className="absolute inset-[12.49%_6.46%_11.54%_6.45%]" data-name="Vector">
        <div className="absolute inset-[-5.48%_-4.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 21">
            <path d={svgPaths.p2efce00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <Frame1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute bg-[#fd7e14] bottom-3/4 left-3/4 right-[-25%] rounded-[50px] top-[-25%]">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[51px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center justify-center p-[10px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[10px] text-center text-nowrap text-white whitespace-pre">0</p>
        </div>
      </div>
    </div>
  );
}

function ShoppingCart() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="shopping-cart">
      <div className="absolute inset-[83.33%_58.33%_8.33%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p32cd9cf0} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[83.33%_12.5%_8.33%_79.17%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p32cd9cf0} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[4.17%_4.17%_33.33%_4.17%]" data-name="Vector">
        <div className="absolute inset-[-6.67%_-4.55%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 17">
            <path d={svgPaths.p24e32400} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <Frame2 />
    </div>
  );
}

function Icons() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0" data-name="Icons">
      <Heart />
      <ShoppingCart />
    </div>
  );
}

function InputIcons() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Input+ icons">
      <Input />
      <Icons />
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-white relative rounded-[40px] shadow-[0px_16px_12px_0px_rgba(0,0,0,0.03)] shrink-0 w-full" data-name="Header 2">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[40px] py-[24px] relative w-full">
          <Logo />
          <Menu />
          <InputIcons />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start leading-[normal] not-italic relative shrink-0">
      <p className="-webkit-box capitalize font-['Inter:Bold',sans-serif] font-bold overflow-ellipsis overflow-hidden relative shrink-0 text-[#fd7e14] text-[28px] text-nowrap whitespace-pre">Pet Adoption</p>
      <p className="-webkit-box font-['Poppins:Bold',sans-serif] overflow-ellipsis overflow-hidden relative shrink-0 text-[54px] text-black w-[647px]">Because Every Pet Deserves a Home</p>
    </div>
  );
}

interface ButtonProps {
  userRole?: UserRole;
}

function Button({ userRole }: ButtonProps) {
  const router = useRouter();
  
  // Hide button for admin users
  if (userRole === 'admin') {
    return null;
  }

  return (
    <div 
      className="bg-[#090706] box-border content-stretch flex gap-[10px] h-[60px] items-center justify-center overflow-clip px-[40px] py-[17px] relative rounded-[12px] shrink-0 cursor-pointer hover:bg-[#1a1a1a] transition-colors duration-300" 
      data-name="Button"
      onClick={() => router.push('/browse-pets')}
    >
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-nowrap text-white whitespace-pre">Adopt Now</p>
    </div>
  );
}

interface TextButtonProps {
  userRole?: UserRole;
}

function TextButton({ userRole }: TextButtonProps) {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[45px] grow items-start justify-center min-h-px min-w-px relative shrink-0 w-full" data-name="Text+ button">
      <Frame />
      <p className="-webkit-box font-['Inter:Regular',sans-serif] font-normal leading-[1.6] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-[rgba(0,0,0,0.8)] w-[479px]">Every pet deserves a chance at a safe and caring home. Explore our thoughtfully selected list of adoptable animals and discover the companion that fits your lifestyle. We offer full guidance and support throughout the adoption journey to help you make a confident and lasting choice.</p>
      <Button userRole={userRole} />
    </div>
  );
}

function ShapesPattern() {
  return (
    <div className="h-[902px] relative shrink-0 w-[937px]" data-name="Shapes+pattern">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 937 902">
        <g clipPath="url(#clip0_1_878)" id="Shapes+pattern">
          <path d={svgPaths.p3fff3d00} fill="url(#paint0_linear_1_878)" id="Vector" />
          <path d={svgPaths.p22a14580} fill="url(#paint1_linear_1_878)" id="Vector_2" />
          <path d={svgPaths.p360874b0} fill="url(#paint2_linear_1_878)" id="Vector_3" />
          <g id="pattern(paws)">
            <path d={svgPaths.p2d6d3700} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_592_" />
            <path d={svgPaths.p250e7e00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_593_" />
            <path d={svgPaths.p15158d00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_594_" />
            <path d={svgPaths.p81eaeb0} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_595_" />
            <path d={svgPaths.p29748980} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_596_" />
            <path d={svgPaths.p19c77080} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_597_" />
            <path d={svgPaths.p8153400} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_598_" />
            <path d={svgPaths.p1e376200} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_599_" />
            <path d={svgPaths.p25075280} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_600_" />
            <path d={svgPaths.pa31380} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_601_" />
            <path d={svgPaths.pd7dd300} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_602_" />
            <path d={svgPaths.p38b85e00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_603_" />
            <path d={svgPaths.p2bc63c80} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_604_" />
            <path d={svgPaths.p21eee180} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_605_" />
            <path d={svgPaths.p2137d980} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_567_" />
            <path d={svgPaths.pcfba000} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_566_" />
            <path d={svgPaths.p1de1ba00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_565_" />
            <path d={svgPaths.p1fbd3d00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_609_" />
            <path d={svgPaths.p1be41380} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_610_" />
            <path d={svgPaths.paee0d00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_611_" />
            <path d={svgPaths.p4700400} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_612_" />
            <path d={svgPaths.p2f9b7e00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_613_" />
            <path d={svgPaths.p3a5a8c00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_614_" />
            <path d={svgPaths.p231dea40} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_615_" />
            <path d={svgPaths.p29279a00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_616_" />
            <path d={svgPaths.p30169780} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_617_" />
            <path d={svgPaths.p2991c600} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_618_" />
            <path d={svgPaths.p3aec0100} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_619_" />
            <path d={svgPaths.p85e1700} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_620_" />
            <path d={svgPaths.p3608c900} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_564_" />
            <path d={svgPaths.p24878100} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_563_" />
            <path d={svgPaths.p2854500} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_562_" />
            <path d={svgPaths.p35acd680} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_624_" />
            <path d={svgPaths.p176daf80} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_552_" />
            <path d={svgPaths.p172bd480} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_626_" />
            <path d={svgPaths.p1a1e4f0} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_551_" />
            <path d={svgPaths.p27522600} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_550_" />
            <path d={svgPaths.p22210080} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_549_" />
            <path d={svgPaths.p3ade6900} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_548_" />
            <path d={svgPaths.pe54be80} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_547_" />
            <path d={svgPaths.p33b86100} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_546_" />
            <path d={svgPaths.p2102d9f0} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_545_" />
            <path d={svgPaths.p37c3a600} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_544_" />
            <path d={svgPaths.p114c800} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_534_" />
            <path d={svgPaths.p34d5a00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_533_" />
            <path d={svgPaths.p25862500} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_532_" />
            <path d={svgPaths.p365e1a00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_531_" />
            <path d={svgPaths.p151c3340} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_530_" />
            <path d={svgPaths.p32570e00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_529_" />
            <path d={svgPaths.p297fb680} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_528_" />
            <path d={svgPaths.pcebbf80} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_527_" />
            <path d={svgPaths.p554cac0} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_526_" />
            <path d={svgPaths.p3016e300} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_525_" />
            <path d={svgPaths.p1e28cb80} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_524_" />
            <path d={svgPaths.p2a9c87f0} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_523_" />
            <path d={svgPaths.p3ab0f080} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_522_" />
            <path d={svgPaths.p30d9d80} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_521_" />
            <path d={svgPaths.pc642400} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_520_" />
            <path d={svgPaths.p2aa05b80} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_519_" />
            <path d={svgPaths.p29ffa900} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_518_" />
            <path d={svgPaths.p3bc34a00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_517_" />
            <path d={svgPaths.p3cc10c00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_516_" />
            <path d={svgPaths.p2623e900} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_515_" />
            <path d={svgPaths.p30541900} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_514_" />
            <path d={svgPaths.p3424c000} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_513_" />
            <path d={svgPaths.p130e4e80} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_512_" />
            <path d={svgPaths.p20128100} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_511_" />
            <path d={svgPaths.p2eb58080} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_510_" />
            <path d={svgPaths.pc8a7f80} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_488_" />
            <path d={svgPaths.p14d4cd80} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_487_" />
            <path d={svgPaths.p3c45cc00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_662_" />
            <path d={svgPaths.pf82f00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_663_" />
            <path d={svgPaths.p213d8200} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_486_" />
            <path d={svgPaths.p15970a00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_485_" />
            <path d={svgPaths.p2f3abe80} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_482_" />
          </g>
          <path d={svgPaths.p1d892240} fill="url(#paint3_linear_1_878)" id="Vector_4" />
          <path d={svgPaths.p4b2cf00} fill="url(#paint4_linear_1_878)" id="Vector_5" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_878" x1="51" x2="881.091" y1="924" y2="131.868">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_878" x1="740" x2="171.622" y1="752" y2="209.593">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_1_878" x1="243" x2="317.887" y1="624" y2="553.107">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_1_878" x1="364" x2="478.835" y1="352" y2="243.156">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint4_linear_1_878" x1="655" x2="677.905" y1="430" y2="409.087">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <clipPath id="clip0_1_878">
            <rect fill="white" height="902" width="937" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Imgs() {
  return (
    <div className="absolute contents left-[187px] top-[202px] z-10" data-name="Imgs">
      {/* Pet Group (dog, cat, guinea pig) */}
      <div className="absolute left-[150px] top-[-50px] w-[1317px] h-[741px] mt-[107px] mr-[0px] mb-[-53px] ml-[-337px] z-20" data-name="PetGroup">
        <Image 
          alt="Pet family" 
          src={imgPetGroup}
          className="absolute inset-0 max-w-none object-contain pointer-events-none w-full h-full z-20"
          width={1317}
          height={741}
          unoptimized
          priority
        />
      </div>
      {/* Flying Parrot */}
      <div className="absolute left-[-200px] top-[80px] w-[620.83px] h-[349.22px] mx-[-163px] my-[-30px] z-30" data-name="Parrot">
        <Image 
          alt="Flying parrot" 
          src={imgParrot}
          className="absolute inset-0 max-w-none object-contain pointer-events-none w-full h-full z-30"
          width={621}
          height={349}
          unoptimized
          priority
        />
      </div>
    </div>
  );
}

function ImgsShapesPattern() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] items-start left-[938px] top-[72px] z-0" data-name="Imgs+ shapes+ pattern">
      <ShapesPattern />
      <Imgs />
    </div>
  );
}

interface HeroProps {
  userRole?: UserRole;
}

function Hero({ userRole }: HeroProps) {
  return (
    <div className="bg-white relative shrink-0 w-full flex justify-center" data-name="Hero">
      <div className="w-[1920px] h-[767px] flex flex-col items-center overflow-clip rounded-[inherit]">
        <div className="box-border content-stretch flex flex-col h-[767px] items-center px-[312px] py-0 relative w-full mx-[312px] my-[0px]">
          <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.22288373112678528)+(var(--transform-inner-height)*0.9748450517654419)))] items-center justify-center left-[493px] top-[50px] w-[calc(1px*((var(--transform-inner-height)*0.22288373112678528)+(var(--transform-inner-width)*0.9748450517654419)))]" style={{ "--transform-inner-width": "174", "--transform-inner-height": "185" } as React.CSSProperties}>
            <div className="flex-none rotate-[12.878deg] scale-y-[-100%]">
              <div className="h-[185.08px] relative w-[173.863px]" data-name="Shape">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 174 186">
                  <path d={svgPaths.p171ddb80} fill="url(#paint0_linear_1_1072)" id="Shape" />
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1072" x1="-7.41036e-08" x2="184.719" y1="185.08" y2="11.5562">
                      <stop stopColor="#F87537" />
                      <stop offset="1" stopColor="#FBA81F" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
          <div className="h-[160px]" />
          <TextButton userRole={userRole} />
          <ImgsShapesPattern />
          <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.9916847944259644)+(var(--transform-inner-height)*0.12869073450565338)))] items-center justify-center left-[607px] top-[698px] w-[calc(1px*((var(--transform-inner-height)*0.9916847944259644)+(var(--transform-inner-width)*0.12869073450565338)))]" style={{ "--transform-inner-width": "155", "--transform-inner-height": "165" } as React.CSSProperties}>
            <div className="flex-none rotate-[277.394deg] scale-y-[-100%]">
              <div className="h-[165px] relative w-[155px]" data-name="Shape">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 155 165">
                  <path d={svgPaths.p2f3b83a0} fill="url(#paint0_linear_1_876)" id="Shape" />
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_876" x1="-6.60638e-08" x2="164.678" y1="165" y2="10.3024">
                      <stop stopColor="#F87537" />
                      <stop offset="1" stopColor="#FBA81F" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-right">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconBg1() {
  return (
    <div className="bg-black box-border content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip p-[10px] relative rounded-[50px] size-[40px]" data-name="Icon+ bg">
      <ChevronRight />
    </div>
  );
}

function ChevronRight1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-right">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconBg2() {
  return (
    <div className="bg-black box-border content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip p-[10px] relative rounded-[50px] shrink-0 size-[40px]" data-name="Icon+ bg">
      <ChevronRight1 />
    </div>
  );
}

function Icons1() {
  return (
    <div className="content-stretch flex gap-[40px] items-start relative shrink-0" data-name="Icons">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <IconBg1 />
        </div>
      </div>
      <IconBg2 />
    </div>
  );
}

function TextIcons() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Text+ icons">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[40px] text-black text-nowrap whitespace-pre">Browse by category</p>
      <Icons1 />
    </div>
  );
}

function Img() {
  return (
    <div className="h-[216px] relative shrink-0 w-[306px]" data-name="Img">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImg2} />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[20px] not-italic relative shrink-0 text-nowrap whitespace-pre" data-name="Text">
      <p className="font-['Poppins:SemiBold',sans-serif] relative shrink-0 text-[20px] text-black">Accessories</p>
      <p className="font-['Poppins:Regular',sans-serif] relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)]">84 products</p>
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-right">
          <path d="M3.33203 8H12.6654" id="Vector" stroke="var(--stroke-0, #FD7E14)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #FD7E14)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconBg3() {
  return (
    <div className="bg-white relative rounded-[50px] shrink-0 size-[24px]" data-name="Icon+ bg">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[16px] py-0 relative size-[24px]">
          <ArrowRight />
        </div>
      </div>
    </div>
  );
}

function TextIcon() {
  return (
    <div className="bg-[#f8f9fa] box-border content-stretch flex items-start justify-between overflow-clip px-[16px] py-[20px] relative shrink-0 w-[306px]" data-name="Text+ icon">
      <Text4 />
      <IconBg3 />
    </div>
  );
}

function Card() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[20px] shrink-0" data-name="Card">
      <Img />
      <TextIcon />
    </div>
  );
}

function Img1() {
  return (
    <div className="h-[216px] relative shrink-0 w-[306px]" data-name="Img">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImg3} />
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[20px] not-italic relative shrink-0 text-nowrap whitespace-pre" data-name="Text">
      <p className="font-['Poppins:SemiBold',sans-serif] relative shrink-0 text-[20px] text-black">Food</p>
      <p className="font-['Poppins:Regular',sans-serif] relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)]">64 products</p>
    </div>
  );
}

function ArrowRight1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-right">
          <path d="M3.33203 8H12.6654" id="Vector" stroke="var(--stroke-0, #FD7E14)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #FD7E14)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconBg4() {
  return (
    <div className="bg-white relative rounded-[50px] shrink-0 size-[24px]" data-name="Icon+ bg">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[16px] py-0 relative size-[24px]">
          <ArrowRight1 />
        </div>
      </div>
    </div>
  );
}

function TextIcon1() {
  return (
    <div className="bg-[#f8f9fa] box-border content-stretch flex items-start justify-between overflow-clip px-[16px] py-[20px] relative shrink-0 w-[306px]" data-name="Text+ icon">
      <Text5 />
      <IconBg4 />
    </div>
  );
}

function Card1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[20px] shrink-0" data-name="Card">
      <Img1 />
      <TextIcon1 />
    </div>
  );
}

function Img2() {
  return (
    <div className="h-[216px] relative shrink-0 w-[306px]" data-name="Img">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImg4} />
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[20px] not-italic relative shrink-0 text-nowrap whitespace-pre" data-name="Text">
      <p className="font-['Poppins:SemiBold',sans-serif] relative shrink-0 text-[20px] text-black">Furniture</p>
      <p className="font-['Poppins:Regular',sans-serif] relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)]">22 products</p>
    </div>
  );
}

function ArrowRight2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-right">
          <path d="M3.33203 8H12.6654" id="Vector" stroke="var(--stroke-0, #FD7E14)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #FD7E14)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconBg5() {
  return (
    <div className="bg-white relative rounded-[50px] shrink-0 size-[24px]" data-name="Icon+ bg">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[16px] py-0 relative size-[24px]">
          <ArrowRight2 />
        </div>
      </div>
    </div>
  );
}

function TextIcon2() {
  return (
    <div className="bg-[#f8f9fa] box-border content-stretch flex items-start justify-between overflow-clip px-[16px] py-[20px] relative shrink-0 w-[306px]" data-name="Text+ icon">
      <Text6 />
      <IconBg5 />
    </div>
  );
}

function Card2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[20px] shrink-0" data-name="Card">
      <Img2 />
      <TextIcon2 />
    </div>
  );
}

function Img3() {
  return (
    <div className="h-[216px] relative shrink-0 w-[306px]" data-name="Img">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[136.11%] left-[-67.69%] max-w-none top-[-0.51%] w-[170.76%]" src={imgImg5} />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[20px] not-italic relative shrink-0 text-nowrap whitespace-pre" data-name="Text">
      <p className="font-['Poppins:SemiBold',sans-serif] relative shrink-0 text-[20px] text-black">Bags</p>
      <p className="font-['Poppins:Regular',sans-serif] relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)]">16 products</p>
    </div>
  );
}

function ArrowRight3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-right">
          <path d="M3.33203 8H12.6654" id="Vector" stroke="var(--stroke-0, #FD7E14)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #FD7E14)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconBg6() {
  return (
    <div className="bg-white relative rounded-[50px] shrink-0 size-[24px]" data-name="Icon+ bg">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[16px] py-0 relative size-[24px]">
          <ArrowRight3 />
        </div>
      </div>
    </div>
  );
}

function TextIcon3() {
  return (
    <div className="bg-[#f8f9fa] box-border content-stretch flex items-start justify-between overflow-clip px-[16px] py-[20px] relative shrink-0 w-[306px]" data-name="Text+ icon">
      <Text7 />
      <IconBg6 />
    </div>
  );
}

function Card3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[20px] shrink-0" data-name="Card">
      <Img3 />
      <TextIcon3 />
    </div>
  );
}

function Cards() {
  return (
    <div className="content-stretch flex gap-[24px] items-end relative shrink-0 w-full" data-name="Cards">
      <Card />
      <Card1 />
      <Card2 />
      <Card3 />
    </div>
  );
}

function Categories() {
  return (
    <div className="relative shrink-0 w-full" data-name="Categories">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[60px] items-center px-[312px] py-[60px] relative w-full">
          <TextIcons />
          <Cards />
        </div>
      </div>
    </div>
  );
}

function Img4() {
  return (
    <div className="h-[416px] relative shrink-0 w-full" data-name="Img">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#f8f9fa] inset-0" />
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[113.86%] left-[3.37%] max-w-none top-[-12.55%] w-[93.27%]" src={imgImg6} />
        </div>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex flex-col font-['Poppins:SemiBold',sans-serif] gap-[12px] items-start leading-[20px] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" data-name="Text">
      <p className="relative shrink-0 text-[20px]">Premium Dog Food</p>
      <p className="relative shrink-0 text-[16px]">$19.99</p>
    </div>
  );
}

function Heart1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="heart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="heart">
          <path d={svgPaths.p195e8600} id="Vector" stroke="var(--stroke-0, #FD7E14)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconBg7() {
  return (
    <div className="bg-[#f8f9fa] box-border content-stretch flex items-center justify-between overflow-clip px-[4px] py-[2px] relative rounded-[50px] shrink-0 size-[28px]" data-name="Icon+ bg">
      <Heart1 />
    </div>
  );
}

function TextIcon4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text+ icon">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between p-[20px] relative w-full">
          <Text8 />
          <IconBg7 />
        </div>
      </div>
    </div>
  );
}

function Card4() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[20px] shrink-0" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Img4 />
        <TextIcon4 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f8f9fa] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Img5() {
  return (
    <div className="h-[416px] relative shrink-0 w-full" data-name="Img">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#f8f9fa] inset-0" />
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[131.91%] left-[-0.24%] max-w-none top-[-29.71%] w-[100.48%]" src={imgImg7} />
        </div>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col font-['Poppins:SemiBold',sans-serif] gap-[12px] items-start leading-[20px] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" data-name="Text">
      <p className="relative shrink-0 text-[20px]">Premium Cat Food</p>
      <p className="relative shrink-0 text-[16px]">$19.99</p>
    </div>
  );
}

function Heart2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="heart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="heart">
          <path d={svgPaths.p195e8600} id="Vector" stroke="var(--stroke-0, #FD7E14)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconBg8() {
  return (
    <div className="bg-[#f8f9fa] box-border content-stretch flex items-center justify-between overflow-clip px-[4px] py-[2px] relative rounded-[50px] shrink-0 size-[28px]" data-name="Icon+ bg">
      <Heart2 />
    </div>
  );
}

function TextIcon5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text+ icon">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between p-[20px] relative w-full">
          <Text9 />
          <IconBg8 />
        </div>
      </div>
    </div>
  );
}

function Card5() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[20px] shrink-0" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Img5 />
        <TextIcon5 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f8f9fa] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Img6() {
  return (
    <div className="h-[416px] relative shrink-0 w-full" data-name="Img">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#f8f9fa] inset-0" />
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[106.73%] left-[4.81%] max-w-none top-[-3.37%] w-[90.37%]" src={imgImg8} />
        </div>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex flex-col font-['Poppins:SemiBold',sans-serif] gap-[12px] items-start leading-[20px] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" data-name="Text">
      <p className="relative shrink-0 text-[20px]">Premium Dog Food</p>
      <p className="relative shrink-0 text-[16px]">$19.99</p>
    </div>
  );
}

function Heart3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="heart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="heart">
          <path d={svgPaths.p195e8600} id="Vector" stroke="var(--stroke-0, #FD7E14)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconBg9() {
  return (
    <div className="bg-[#f8f9fa] box-border content-stretch flex items-center justify-between overflow-clip px-[4px] py-[2px] relative rounded-[50px] shrink-0 size-[28px]" data-name="Icon+ bg">
      <Heart3 />
    </div>
  );
}

function TextIcon6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text+ icon">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between p-[20px] relative w-full">
          <Text10 />
          <IconBg9 />
        </div>
      </div>
    </div>
  );
}

function Card6() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[20px] shrink-0" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Img6 />
        <TextIcon6 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f8f9fa] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Cards1() {
  return (
    <div className="content-stretch flex gap-[24px] items-start justify-center relative shrink-0 w-full" data-name="Cards">
      <Card4 />
      <Card5 />
      <Card6 />
    </div>
  );
}

function FeaturedProducts() {
  return (
    <div className="relative shrink-0 w-full" data-name="Featured products">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[60px] items-center pb-[120px] pt-[60px] px-[312px] relative w-full">
          <p className="font-['Poppins:SemiBold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[40px] text-black text-center text-nowrap whitespace-pre">Featured products</p>
          <Cards1 />
        </div>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex flex-col font-['Poppins:Bold',sans-serif] gap-[20px] items-start relative shrink-0" data-name="Text">
      <p className="-webkit-box capitalize leading-[normal] overflow-ellipsis overflow-hidden relative shrink-0 text-[#fd7e14] text-[16px] text-nowrap whitespace-pre">Pet shop</p>
      <div className="-webkit-box leading-[normal] overflow-ellipsis overflow-hidden relative shrink-0 text-[40px] text-black w-[587px]">
        <p className="mb-0">{`The smarter way to shop `}</p>
        <p>for your pet</p>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start not-italic relative shrink-0" data-name="Text">
      <Text11 />
      <p className="font-['Poppins:Regular',sans-serif] leading-[1.6] relative shrink-0 text-[16px] text-[rgba(0,0,0,0.8)] w-[479px]">Lorem ipsum dolor sit amet consectetur. At et vehicula sodales est proin turpis pellentesque sinulla a aliquam amet rhoncus quisque eget sit</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-black box-border content-stretch flex gap-[10px] h-[60px] items-center justify-center overflow-clip px-[40px] py-[17px] relative rounded-[12px] shrink-0" data-name="Button">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-nowrap text-white whitespace-pre">Learn More</p>
    </div>
  );
}

function TextButton1() {
  return (
    <div className="content-stretch flex flex-col gap-[60px] items-start relative shrink-0" data-name="Text+ button">
      <Text12 />
      <Button1 />
    </div>
  );
}

function Vector() {
  return (
    <div className="absolute inset-[8.3%_37.55%_1.39%_6.98%]" data-name="Vector">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1066 538">
        <g id="Vector">
          <path d={svgPaths.p11831500} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_592_" />
          <path d={svgPaths.p249f0200} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_593_" />
          <path d={svgPaths.p2c4ccd00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_594_" />
          <path d={svgPaths.p141dd6f0} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_595_" />
          <path d={svgPaths.p497e480} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_596_" />
          <path d={svgPaths.p245e9100} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_597_" />
          <path d={svgPaths.p130bd280} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_598_" />
          <path d={svgPaths.p24250e00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_599_" />
          <path d={svgPaths.p5431200} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_600_" />
          <path d={svgPaths.p2660d900} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_601_" />
          <path d={svgPaths.p12a1caf0} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_602_" />
          <path d={svgPaths.p21301f00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_603_" />
          <path d={svgPaths.p350ecc80} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_604_" />
          <path d={svgPaths.p3a620500} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_605_" />
          <path d={svgPaths.p326df900} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_567_" />
          <path d={svgPaths.p30174700} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_566_" />
          <path d={svgPaths.pf9e5b00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_565_" />
          <path d={svgPaths.p18a535b0} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_609_" />
          <path d={svgPaths.pb35b080} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_610_" />
          <path d={svgPaths.p2c2e1800} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_611_" />
          <path d={svgPaths.p179ce300} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_612_" />
          <path d={svgPaths.p3d731900} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_613_" />
          <path d={svgPaths.p3abeaa80} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_614_" />
          <path d={svgPaths.p353f9880} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_615_" />
          <path d={svgPaths.p23b945f0} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_616_" />
          <path d={svgPaths.p30dd6c80} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_617_" />
          <path d={svgPaths.p6268600} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_618_" />
          <path d={svgPaths.p2c7b8e00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_619_" />
          <path d={svgPaths.p10494f0} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_620_" />
          <path d={svgPaths.p99e4900} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_564_" />
          <path d={svgPaths.p7b50740} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_563_" />
          <path d={svgPaths.p2dff4c30} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_562_" />
          <path d={svgPaths.p3486bef0} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_624_" />
          <path d={svgPaths.p200a500} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_552_" />
          <path d={svgPaths.p211ed780} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_626_" />
          <path d={svgPaths.p12edf7f0} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_551_" />
          <path d={svgPaths.p3e685af0} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_550_" />
          <path d={svgPaths.p4b80100} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_549_" />
          <path d={svgPaths.p153c5a00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_548_" />
          <path d={svgPaths.p3b109800} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_547_" />
          <path d={svgPaths.p13ff7900} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_546_" />
          <path d={svgPaths.pd52c780} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_545_" />
          <path d={svgPaths.pf5dffa2} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_544_" />
          <path d={svgPaths.pe32c300} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_534_" />
          <path d={svgPaths.p102a6c70} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_533_" />
          <path d={svgPaths.p19dc2a00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_532_" />
          <path d={svgPaths.p15bf5480} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_531_" />
          <path d={svgPaths.p2789200} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_530_" />
          <path d={svgPaths.p1581ff00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_529_" />
          <path d={svgPaths.p3418a80} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_528_" />
          <path d={svgPaths.p38b81b00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_527_" />
          <path d={svgPaths.p32029700} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_526_" />
          <path d={svgPaths.p13b91280} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_525_" />
          <path d={svgPaths.p2973fa00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_524_" />
          <path d={svgPaths.p15fa600} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_523_" />
          <path d={svgPaths.p33d2300} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_522_" />
          <path d={svgPaths.p703ba00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_521_" />
          <path d={svgPaths.p309acd80} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_520_" />
          <path d={svgPaths.p28013780} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_519_" />
          <path d={svgPaths.p2b815c80} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_518_" />
          <path d={svgPaths.p51ac080} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_517_" />
          <path d={svgPaths.p3f179700} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_516_" />
          <path d={svgPaths.p3ab58880} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_515_" />
          <path d={svgPaths.p86dba70} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_514_" />
          <path d={svgPaths.p32d23e80} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_513_" />
          <path d={svgPaths.p2c1edc80} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_512_" />
          <path d={svgPaths.p17d1d100} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_511_" />
          <path d={svgPaths.p14842c00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_510_" />
          <path d={svgPaths.p29273500} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_488_" />
          <path d={svgPaths.p20bba240} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_487_" />
          <path d={svgPaths.p3343acf0} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_662_" />
          <path d={svgPaths.p1a66bd00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_663_" />
          <path d={svgPaths.p10889400} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_486_" />
          <path d={svgPaths.p1846db00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_485_" />
          <path d={svgPaths.p3150ba00} fill="var(--fill-0, white)" fillOpacity="0.1" id="XMLID_482_" />
        </g>
      </svg>
    </div>
  );
}

function Imgs1() {
  return (
    <div className="absolute contents left-[333px] top-[77.51px]" data-name="Imgs">
      <div className="absolute left-[145.43px] size-[366.933px] top-0" data-name="cat 2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgCat2} />
      </div>
      <div className="absolute h-[350.678px] left-0 top-[22.49px] w-[366.563px]" data-name="cat 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgCat1} />
      </div>
    </div>
  );
}

function ShapeVectorImg() {
  return (
    <div className="absolute contents left-[134px] top-[-3px]" data-name="Shape+ vector +img">
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.22288373112678528)+(var(--transform-inner-height)*0.9748450517654419)))] items-center justify-center left-[288.34px] top-[-3px] w-[calc(1px*((var(--transform-inner-height)*0.22288373112678528)+(var(--transform-inner-width)*0.9748450517654419)))]" style={{ "--transform-inner-width": "468", "--transform-inner-height": "498" } as React.CSSProperties}>
        <div className="flex-none rotate-[167.122deg]">
          <div className="h-[497.965px] relative w-[467.785px]" data-name="Shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 468 498">
              <path d={svgPaths.p25487200} fill="url(#paint0_linear_1_841)" id="Shape" />
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_841" x1="-1.99378e-07" x2="496.993" y1="497.965" y2="31.0924">
                  <stop stopColor="#F87537" />
                  <stop offset="1" stopColor="#FBA81F" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.4297334551811218)+(var(--transform-inner-height)*0.9029557704925537)))] items-center justify-center left-[664.99px] top-[275.14px] w-[calc(1px*((var(--transform-inner-height)*0.4297334551811218)+(var(--transform-inner-width)*0.9029557704925537)))]" style={{ "--transform-inner-width": "89", "--transform-inner-height": "94" } as React.CSSProperties}>
        <div className="flex-none rotate-[205.451deg]">
          <div className="h-[94.356px] relative w-[88.637px]" data-name="Shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89 95">
              <path d={svgPaths.p1dee1100} fill="url(#paint0_linear_1_853)" id="Shape" />
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_853" x1="2.6967e-08" x2="94.1717" y1="94.3559" y2="5.8915">
                  <stop stopColor="#F87537" />
                  <stop offset="1" stopColor="#FBA81F" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.3229066729545593)+(var(--transform-inner-height)*0.9464308023452759)))] items-center justify-center left-[540.96px] top-[148.01px] w-[calc(1px*((var(--transform-inner-height)*0.3229066729545593)+(var(--transform-inner-width)*0.9464308023452759)))]" style={{ "--transform-inner-width": "89", "--transform-inner-height": "94" } as React.CSSProperties}>
        <div className="flex-none rotate-[161.161deg]">
          <div className="h-[94.356px] relative w-[88.637px]" data-name="Shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89 95">
              <path d={svgPaths.p1dee1100} fill="url(#paint0_linear_1_843)" id="Shape" />
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_843" x1="2.6967e-08" x2="94.1717" y1="94.3559" y2="5.8915">
                  <stop stopColor="#F87537" />
                  <stop offset="1" stopColor="#FBA81F" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.22288373112678528)+(var(--transform-inner-height)*0.9748450517654419)))] items-center justify-center left-[344.76px] top-[136.05px] w-[calc(1px*((var(--transform-inner-height)*0.22288373112678528)+(var(--transform-inner-width)*0.9748450517654419)))]" style={{ "--transform-inner-width": "352", "--transform-inner-height": "375" } as React.CSSProperties}>
        <div className="flex-none rotate-[167.122deg]">
          <div className="h-[374.793px] relative w-[352.078px]" data-name="Shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 353 375">
              <path d={svgPaths.p3aec7880} fill="url(#paint0_linear_1_733)" id="Shape" />
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_733" x1="1.07116e-07" x2="374.062" y1="374.793" y2="23.4018">
                  <stop stopColor="#F87537" />
                  <stop offset="1" stopColor="#FBA81F" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <Vector />
      <Imgs1 />
    </div>
  );
}

function InfoBlock() {
  return (
    <div className="bg-[#f8f9fa] relative shrink-0 w-full" data-name="Info block">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex items-center justify-end px-[312px] py-[120px] relative w-full">
          <TextButton1 />
          <ShapeVectorImg />
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-[78.32%] place-items-start relative" data-name="Group">
      <p className="[grid-area:1_/_1] bg-clip-text bg-gradient-to-b font-['Inter:Regular',sans-serif] font-normal from-[#f87537] leading-[normal] ml-0 mt-0 not-italic relative text-[16px] text-nowrap to-[#fba81f] whitespace-pre" style={{ WebkitTextFillColor: "transparent" }}>
        Company Name
      </p>
    </div>
  );
}

function Group2() {
  return (
    <div className="[grid-area:1_/_1] h-[24.629px] ml-0 mt-0 relative w-[44.47px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45 25">
        <g id="Group">
          <path d={svgPaths.p11d9c100} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p2cb27df0} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p35b7a900} fill="var(--fill-0, white)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] ml-[27.86%] mt-[30.73%] place-items-start relative" data-name="Group">
      <Group2 />
    </div>
  );
}

function Group4() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[8.26%] mt-0 place-items-start relative" data-name="Group">
      <div className="[grid-area:1_/_1] h-[63.908px] ml-[12.03px] mt-0 relative w-[77.243px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78 64">
          <path d={svgPaths.p2df8ae00} fill="url(#paint0_linear_1_755)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_755" x1="38.6213" x2="38.6213" y1="1.01627e-08" y2="63.9075">
              <stop stopColor="#F87537" />
              <stop offset="1" stopColor="#FBA81F" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <Group3 />
      <div className="[grid-area:1_/_1] h-[30.447px] ml-0 mt-[11.71px] relative w-[14.013px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 31">
          <path d={svgPaths.p9c10f0} fill="url(#paint0_linear_1_845)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_845" x1="7.00632" x2="7.00632" y1="0" y2="30.4473">
              <stop stopColor="#F87537" />
              <stop offset="1" stopColor="#FBA81F" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="[grid-area:1_/_1] h-[32.192px] ml-[85.36px] mt-[9.97px] relative w-[16.642px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 33">
          <path d={svgPaths.p3ece07c0} fill="url(#paint0_linear_1_1066)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1066" x1="8.32091" x2="8.32091" y1="3.18818e-10" y2="32.192">
              <stop stopColor="#F87537" />
              <stop offset="1" stopColor="#FBA81F" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="[grid-area:1_/_1] h-[34.627px] ml-[72.81px] mt-[7.55px] relative w-[12.796px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 35">
          <path d={svgPaths.p3a762980} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="[grid-area:1_/_1] h-[2.217px] ml-[68.01px] mt-[5.89px] relative w-[2.01px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
          <path d={svgPaths.p2c37a800} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Logo1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Logo">
      <Group1 />
      <Group4 />
    </div>
  );
}

function Group5() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-[80.58%] place-items-start relative" data-name="Group">
      <p className="[grid-area:1_/_1] bg-clip-text bg-gradient-to-b font-['Inter:Regular',sans-serif] font-normal from-[#f87537] leading-[normal] ml-0 mt-0 not-italic relative text-[16px] text-nowrap to-[#fba81f] whitespace-pre" style={{ WebkitTextFillColor: "transparent" }}>
        Company Name
      </p>
    </div>
  );
}

function Logo2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Logo">
      <Group5 />
      <div className="[grid-area:1_/_1] h-[75.112px] ml-[14.38px] mt-0 relative w-[77.369px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78 76">
          <path d={svgPaths.p1e36a480} fill="url(#paint0_linear_1_855)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_855" x1="38.6845" x2="38.6845" y1="-7.78015e-10" y2="75.1117">
              <stop stopColor="#F87537" />
              <stop offset="1" stopColor="#FBA81F" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="[grid-area:1_/_1] h-[44.445px] ml-[32.69px] mt-[30.37px] relative w-[47.192px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 45">
          <path d={svgPaths.p2df38980} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="[grid-area:1_/_1] h-[10.104px] ml-[46.71px] mt-[34.21px] relative w-[6.606px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 11">
          <path d={svgPaths.pe4eae00} fill="url(#paint0_linear_1_729)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_729" x1="3.30296" x2="3.30296" y1="-2.36624e-08" y2="10.104">
              <stop stopColor="#F87537" />
              <stop offset="1" stopColor="#FBA81F" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="[grid-area:1_/_1] h-[2.803px] ml-[43.07px] mt-[33.05px] relative w-[2.828px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
          <path d={svgPaths.p1db0a710} fill="url(#paint0_linear_1_725)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_725" x1="1.41384" x2="1.41384" y1="2.59779e-09" y2="2.8034">
              <stop stopColor="#F87537" />
              <stop offset="1" stopColor="#FBA81F" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Logo3() {
  return (
    <div className="h-[96px] relative shrink-0 w-[100px]" data-name="Logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 96">
        <g clipPath="url(#clip0_1_737)" id="Logo">
          <path d={svgPaths.p233e9180} fill="url(#paint0_linear_1_737)" id="Vector" />
          <path d={svgPaths.p3f079c00} fill="url(#paint1_linear_1_737)" id="Vector_2" />
          <path d={svgPaths.p1cd0e000} fill="url(#paint2_linear_1_737)" id="Vector_3" />
          <path d={svgPaths.p32b64900} fill="url(#paint3_linear_1_737)" id="Vector_4" />
          <path d={svgPaths.p18369080} fill="url(#paint4_linear_1_737)" id="Vector_5" />
          <path d={svgPaths.p3ded6670} fill="url(#paint5_linear_1_737)" id="Vector_6" />
          <path d={svgPaths.p119a8800} fill="url(#paint6_linear_1_737)" id="Vector_7" />
          <path d={svgPaths.p36e56800} fill="url(#paint7_linear_1_737)" id="Vector_8" />
          <path d={svgPaths.p2eeff700} fill="url(#paint8_linear_1_737)" id="Vector_9" />
          <path d={svgPaths.p3712df00} fill="url(#paint9_linear_1_737)" id="Vector_10" />
          <path d={svgPaths.p1b1d3000} fill="url(#paint10_linear_1_737)" id="Vector_11" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_737" x1="50.3825" x2="50.3825" y1="43.1594" y2="55.4591">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_737" x1="41.0363" x2="41.0363" y1="41.8819" y2="54.5382">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_1_737" x1="33.6367" x2="33.6367" y1="48.3109" y2="59.2388">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_1_737" x1="48.7731" x2="48.7731" y1="56.1163" y2="74.4621">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint4_linear_1_737" x1="32.3358" x2="32.3358" y1="58.6547" y2="67.4313">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint5_linear_1_737" x1="83.8642" x2="83.8642" y1="34.9528" y2="44.6092">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint6_linear_1_737" x1="81.182" x2="81.182" y1="24.9607" y2="36.7735">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint7_linear_1_737" x1="72.8751" x2="72.8751" y1="19.9251" y2="33.1251">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint8_linear_1_737" x1="67.8828" x2="67.8828" y1="34.9339" y2="53.1304">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint9_linear_1_737" x1="63.8255" x2="63.8255" y1="22.742" y2="35.2855">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint10_linear_1_737" x1="50.001" x2="50.001" y1="0.000141535" y2="96.0005">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <clipPath id="clip0_1_737">
            <rect fill="white" height="96" width="100" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group6() {
  return (
    <div className="[grid-area:1_/_1] h-[65.428px] ml-[13.68%] mt-0 relative w-[79.796px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 66">
        <g id="Group">
          <path d={svgPaths.p1f4a9580} fill="url(#paint0_linear_1_1046)" id="Vector" />
          <path d={svgPaths.p351b4200} fill="url(#paint1_linear_1_1046)" id="Vector_2" />
          <path d={svgPaths.p7921d00} fill="url(#paint2_linear_1_1046)" id="Vector_3" />
          <path d={svgPaths.p2ed9db80} fill="url(#paint3_linear_1_1046)" id="Vector_4" />
          <path d={svgPaths.pb4746b0} fill="url(#paint4_linear_1_1046)" id="Vector_5" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1046" x1="38.3867" x2="38.3867" y1="26.614" y2="65.4283">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_1046" x1="7.48636" x2="7.48636" y1="16.0666" y2="37.6647">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_1_1046" x1="26.7281" x2="26.7281" y1="1.35794" y2="23.6656">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_1_1046" x1="49.9125" x2="49.9125" y1="0" y2="23.8541">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint4_linear_1_1046" x1="71.2068" x2="71.2068" y1="16.2203" y2="38.5937">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Logo4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Logo">
      <div className="[grid-area:1_/_1] h-[13.845px] ml-[65.54px] mt-[11.37px] relative w-[6.005px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 14">
          <path d={svgPaths.p1caa1900} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="[grid-area:1_/_1] h-[8.83px] ml-[43.18px] mt-[13.66px] relative w-[6.537px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 9">
          <path d={svgPaths.p1d7e570} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="[grid-area:1_/_1] h-[10.026px] ml-[25px] mt-[26.09px] relative w-[6.675px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 11">
          <path d={svgPaths.p20d6c620} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <Group6 />
      <p className="[grid-area:1_/_1] bg-clip-text bg-gradient-to-b font-['Inter:Regular',sans-serif] font-normal from-[#f87537] leading-[normal] ml-0 mt-[71.99px] not-italic relative text-[16px] text-nowrap to-[#fba81f] whitespace-pre" style={{ WebkitTextFillColor: "transparent" }}>
        Company Name
      </p>
      <div className="[grid-area:1_/_1] h-[3.404px] ml-[57.56px] mt-[29.51px] relative w-[3.47px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <path d={svgPaths.p3a72bc80} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="[grid-area:1_/_1] h-[27.786px] ml-[63.93px] mt-[32.82px] relative w-[15.981px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 28">
          <path d={svgPaths.p353bf300} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="[grid-area:1_/_1] h-[14.372px] ml-[89.33px] mt-[19.46px] relative w-[4.39px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 15">
          <path d={svgPaths.p3d066600} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-[82.03%] place-items-start relative" data-name="Group">
      <p className="[grid-area:1_/_1] bg-clip-text bg-gradient-to-b font-['Inter:Regular',sans-serif] font-normal from-[#f87537] h-[19.711px] leading-[normal] ml-0 mt-0 not-italic relative text-[16px] to-[#fba81f] w-[124.014px]" style={{ WebkitTextFillColor: "transparent" }}>
        Company Name
      </p>
    </div>
  );
}

function Group8() {
  return (
    <div className="[grid-area:1_/_1] h-[87.031px] ml-[6.95%] mt-0 relative w-[100.906px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 101 88">
        <g id="Group">
          <path d={svgPaths.p3319ed00} fill="url(#paint0_linear_1_712)" id="Vector" />
          <path d={svgPaths.p3f69480} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.paad4480} fill="url(#paint1_linear_1_712)" id="Vector_3" />
          <path d={svgPaths.p2d3a8780} fill="url(#paint2_linear_1_712)" id="Vector_4" />
          <path d={svgPaths.p154e9f0} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p37d3c580} fill="var(--fill-0, white)" id="Vector_6" />
          <path d={svgPaths.p32e94b00} fill="var(--fill-0, white)" id="Vector_7" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_712" x1="50.4529" x2="50.4529" y1="4.57542e-08" y2="87.0307">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_712" x1="66.0388" x2="66.0388" y1="42.0434" y2="78.233">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_1_712" x1="51.4295" x2="51.4295" y1="37.2801" y2="43.533">
            <stop stopColor="#F87537" />
            <stop offset="1" stopColor="#FBA81F" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Logo5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Logo">
      <Group7 />
      <Group8 />
    </div>
  );
}

function Logos() {
  return (
    <div className="relative shrink-0 w-full" data-name="Logos">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[312px] py-[60px] relative w-full">
          <Logo1 />
          <Logo2 />
          <Logo3 />
          <Logo4 />
          <Logo5 />
        </div>
      </div>
    </div>
  );
}

function Img7() {
  return (
    <div className="relative shrink-0 size-[306px]" data-name="Img">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#f8f9fa] inset-0" />
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute left-[12.06%] max-w-none size-[69.58%] top-[16.56%]" src={imgImg9} />
        </div>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[20px] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" data-name="Text">
      <p className="font-['Poppins:SemiBold',sans-serif] relative shrink-0 text-[20px]">Cat Bowl</p>
      <p className="font-['Poppins:Regular',sans-serif] relative shrink-0 text-[16px]">$20.99</p>
    </div>
  );
}

function Heart4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="heart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="heart">
          <path d={svgPaths.p195e8600} id="Vector" stroke="var(--stroke-0, #FD7E14)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconBg10() {
  return (
    <div className="bg-[#f8f9fa] box-border content-stretch flex items-center justify-between overflow-clip px-[4px] py-[2px] relative rounded-[50px] shrink-0 size-[28px]" data-name="Icon+ bg">
      <Heart4 />
    </div>
  );
}

function TextIcon7() {
  return (
    <div className="box-border content-stretch flex items-start justify-between p-[20px] relative shrink-0 w-[306px]" data-name="Text+ icon">
      <Text13 />
      <IconBg10 />
    </div>
  );
}

function Card7() {
  return (
    <div className="relative rounded-[20px] shrink-0" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit]">
        <Img7 />
        <TextIcon7 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f8f9fa] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Img8() {
  return (
    <div className="relative shrink-0 size-[306px]" data-name="Img">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#f8f9fa] inset-0" />
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[68.85%] left-[4.1%] max-w-none top-[15.57%] w-[91.81%]" src={imgImg10} />
        </div>
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[20px] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" data-name="Text">
      <p className="font-['Poppins:SemiBold',sans-serif] relative shrink-0 text-[20px]">Cat Bowl</p>
      <p className="font-['Poppins:Regular',sans-serif] relative shrink-0 text-[16px]">$49.99</p>
    </div>
  );
}

function Heart5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="heart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="heart">
          <path d={svgPaths.p195e8600} id="Vector" stroke="var(--stroke-0, #FD7E14)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconBg11() {
  return (
    <div className="bg-[#f8f9fa] box-border content-stretch flex items-center justify-between overflow-clip px-[4px] py-[2px] relative rounded-[50px] shrink-0 size-[28px]" data-name="Icon+ bg">
      <Heart5 />
    </div>
  );
}

function TextIcon8() {
  return (
    <div className="box-border content-stretch flex items-start justify-between p-[20px] relative shrink-0 w-[306px]" data-name="Text+ icon">
      <Text14 />
      <IconBg11 />
    </div>
  );
}

function Card8() {
  return (
    <div className="relative rounded-[20px] shrink-0" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit]">
        <Img8 />
        <TextIcon8 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f8f9fa] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Img9() {
  return (
    <div className="relative shrink-0 size-[306px]" data-name="Img">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#f8f9fa] inset-0" />
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute left-[8.34%] max-w-none size-[80.18%] top-[11.49%]" src={imgImg11} />
        </div>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[20px] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" data-name="Text">
      <p className="font-['Poppins:SemiBold',sans-serif] relative shrink-0 text-[20px]">Dog Leash</p>
      <p className="font-['Poppins:Regular',sans-serif] relative shrink-0 text-[16px]">$9.99</p>
    </div>
  );
}

function Heart6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="heart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="heart">
          <path d={svgPaths.p195e8600} id="Vector" stroke="var(--stroke-0, #FD7E14)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconBg12() {
  return (
    <div className="bg-[#f8f9fa] box-border content-stretch flex items-center justify-between overflow-clip px-[4px] py-[2px] relative rounded-[50px] shrink-0 size-[28px]" data-name="Icon+ bg">
      <Heart6 />
    </div>
  );
}

function TextIcon9() {
  return (
    <div className="box-border content-stretch flex items-start justify-between p-[20px] relative shrink-0 w-[306px]" data-name="Text+ icon">
      <Text15 />
      <IconBg12 />
    </div>
  );
}

function Card9() {
  return (
    <div className="relative rounded-[20px] shrink-0" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit]">
        <Img9 />
        <TextIcon9 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f8f9fa] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Img10() {
  return (
    <div className="relative shrink-0 size-[306px]" data-name="Img">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#f8f9fa] inset-0" />
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[141.64%] left-0 max-w-none top-[-41.64%] w-full" src={imgImg12} />
        </div>
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[20px] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" data-name="Text">
      <p className="font-['Poppins:SemiBold',sans-serif] relative shrink-0 text-[20px]">Premium Cat Food</p>
      <p className="font-['Poppins:Regular',sans-serif] relative shrink-0 text-[16px]">$19.99</p>
    </div>
  );
}

function Heart7() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="heart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="heart">
          <path d={svgPaths.p195e8600} id="Vector" stroke="var(--stroke-0, #FD7E14)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconBg13() {
  return (
    <div className="bg-[#f8f9fa] box-border content-stretch flex items-center justify-between overflow-clip px-[4px] py-[2px] relative rounded-[50px] shrink-0 size-[28px]" data-name="Icon+ bg">
      <Heart7 />
    </div>
  );
}

function TextIcon10() {
  return (
    <div className="box-border content-stretch flex items-start justify-between p-[20px] relative shrink-0 w-[306px]" data-name="Text+ icon">
      <Text16 />
      <IconBg13 />
    </div>
  );
}

function Card10() {
  return (
    <div className="relative rounded-[20px] shrink-0" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit]">
        <Img10 />
        <TextIcon10 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f8f9fa] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Img11() {
  return (
    <div className="relative shrink-0 size-[306px]" data-name="Img">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#f8f9fa] inset-0" />
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute left-[15.48%] max-w-none size-[67.54%] top-[20.74%]" src={imgImg13} />
        </div>
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[20px] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" data-name="Text">
      <p className="font-['Poppins:SemiBold',sans-serif] relative shrink-0 text-[20px]">Dog Bowl</p>
      <p className="font-['Poppins:Regular',sans-serif] relative shrink-0 text-[16px]">$19.99</p>
    </div>
  );
}

function Heart8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="heart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="heart">
          <path d={svgPaths.p195e8600} id="Vector" stroke="var(--stroke-0, #FD7E14)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconBg14() {
  return (
    <div className="bg-[#f8f9fa] box-border content-stretch flex items-center justify-between overflow-clip px-[4px] py-[2px] relative rounded-[50px] shrink-0 size-[28px]" data-name="Icon+ bg">
      <Heart8 />
    </div>
  );
}

function TextIcon11() {
  return (
    <div className="box-border content-stretch flex items-start justify-between p-[20px] relative shrink-0 w-[306px]" data-name="Text+ icon">
      <Text17 />
      <IconBg14 />
    </div>
  );
}

function Card11() {
  return (
    <div className="relative rounded-[20px] shrink-0" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit]">
        <Img11 />
        <TextIcon11 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f8f9fa] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Img12() {
  return (
    <div className="relative shrink-0 size-[306px]" data-name="Img">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#f8f9fa] inset-0" />
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[111.93%] left-[8.5%] max-w-none top-[-17.37%] w-[88.89%]" src={imgImg14} />
        </div>
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[20px] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" data-name="Text">
      <p className="font-['Poppins:SemiBold',sans-serif] relative shrink-0 text-[20px]">Premium Dog Food</p>
      <p className="font-['Poppins:Regular',sans-serif] relative shrink-0 text-[16px]">29.99</p>
    </div>
  );
}

function Heart9() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="heart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="heart">
          <path d={svgPaths.p195e8600} id="Vector" stroke="var(--stroke-0, #FD7E14)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconBg15() {
  return (
    <div className="bg-[#f8f9fa] box-border content-stretch flex items-center justify-between overflow-clip px-[4px] py-[2px] relative rounded-[50px] shrink-0 size-[28px]" data-name="Icon+ bg">
      <Heart9 />
    </div>
  );
}

function TextIcon12() {
  return (
    <div className="box-border content-stretch flex items-start justify-between p-[20px] relative shrink-0 w-[306px]" data-name="Text+ icon">
      <Text18 />
      <IconBg15 />
    </div>
  );
}

function Card12() {
  return (
    <div className="relative rounded-[20px] shrink-0" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit]">
        <Img12 />
        <TextIcon12 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f8f9fa] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Img13() {
  return (
    <div className="relative shrink-0 size-[306px]" data-name="Img">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#f8f9fa] inset-0" />
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute left-[8.28%] max-w-none size-[88.79%] top-[11.85%]" src={imgImg15} />
        </div>
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[20px] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" data-name="Text">
      <p className="font-['Poppins:SemiBold',sans-serif] relative shrink-0 text-[20px]">Dog Bed</p>
      <p className="font-['Poppins:Regular',sans-serif] relative shrink-0 text-[16px]">$49.99</p>
    </div>
  );
}

function Heart10() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="heart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="heart">
          <path d={svgPaths.p195e8600} id="Vector" stroke="var(--stroke-0, #FD7E14)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconBg16() {
  return (
    <div className="bg-[#f8f9fa] box-border content-stretch flex items-center justify-between overflow-clip px-[4px] py-[2px] relative rounded-[50px] shrink-0 size-[28px]" data-name="Icon+ bg">
      <Heart10 />
    </div>
  );
}

function TextIcon13() {
  return (
    <div className="box-border content-stretch flex items-start justify-between p-[20px] relative shrink-0 w-[306px]" data-name="Text+ icon">
      <Text19 />
      <IconBg16 />
    </div>
  );
}

function Card13() {
  return (
    <div className="relative rounded-[20px] shrink-0" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit]">
        <Img13 />
        <TextIcon13 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f8f9fa] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Img14() {
  return (
    <div className="relative shrink-0 size-[306px]" data-name="Img">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#f8f9fa] inset-0" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgImg16} />
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[20px] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" data-name="Text">
      <p className="font-['Poppins:SemiBold',sans-serif] relative shrink-0 text-[20px]">Premium Dog Food</p>
      <p className="font-['Poppins:Regular',sans-serif] relative shrink-0 text-[16px]">$19.99</p>
    </div>
  );
}

function Heart11() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="heart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="heart">
          <path d={svgPaths.p195e8600} id="Vector" stroke="var(--stroke-0, #FD7E14)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconBg17() {
  return (
    <div className="bg-[#f8f9fa] box-border content-stretch flex items-center justify-between overflow-clip px-[4px] py-[2px] relative rounded-[50px] shrink-0 size-[28px]" data-name="Icon+ bg">
      <Heart11 />
    </div>
  );
}

function TextIcon14() {
  return (
    <div className="box-border content-stretch flex items-start justify-between p-[20px] relative shrink-0 w-[306px]" data-name="Text+ icon">
      <Text20 />
      <IconBg17 />
    </div>
  );
}

function Card14() {
  return (
    <div className="relative rounded-[20px] shrink-0" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit]">
        <Img14 />
        <TextIcon14 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f8f9fa] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Cards2() {
  return (
    <div className="content-start flex flex-wrap gap-[24px] items-start relative shrink-0 w-[1296px]" data-name="Cards">
      <Card7 />
      <Card8 />
      <Card9 />
      <Card10 />
      <Card11 />
      <Card12 />
      <Card13 />
      <Card14 />
    </div>
  );
}

function BestSellingProducts() {
  return (
    <div className="relative shrink-0 w-full" data-name="Best selling products">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[60px] items-center px-[312px] py-[60px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[40px] text-black text-nowrap whitespace-pre">Best selling products</p>
          <Cards2 />
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[48px] not-italic relative shrink-0 text-[40px] text-black text-nowrap whitespace-pre">Browse by pet</p>
    </div>
  );
}

function ChevronRight2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-right">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-black box-border content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip p-[10px] relative rounded-[50px] size-[40px]">
      <ChevronRight2 />
    </div>
  );
}

function ChevronRight3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-right">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-black box-border content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip p-[10px] relative rounded-[50px] shrink-0 size-[40px]">
      <ChevronRight3 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[40px] items-start relative shrink-0">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Frame4 />
        </div>
      </div>
      <Frame3 />
    </div>
  );
}

function TextIcon15() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Text+ icon">
      <Frame6 />
      <Frame5 />
    </div>
  );
}

function ImgShape() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Img+ shape">
      <div className="[grid-area:1_/_1] flex h-[187.347px] items-center justify-center ml-[19px] mt-[17px] relative w-[180px]">
        <div className="flex-none h-[187.347px] scale-y-[-100%] w-[180px]">
          <div className="relative size-full" data-name="Vector">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 180 188">
              <path d={svgPaths.p3b910800} fill="url(#paint0_linear_1_707)" id="Vector" />
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_707" x1="-7.67192e-08" x2="187.197" y1="187.347" y2="7.49088">
                  <stop stopColor="#F87537" />
                  <stop offset="1" stopColor="#FBA81F" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex h-[188px] items-center justify-center ml-0 mt-0 relative w-[196px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[188px] relative w-[196px]" data-name="Img">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgCat1} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ImgBgText() {
  const router = useRouter();

  return (
    <div 
      className="content-stretch flex flex-col gap-[26px] items-center relative shrink-0 cursor-pointer transition-transform duration-300 hover:scale-110" 
      data-name="Img+bg+ text"
      onClick={() => router.push('/browse-pets')}
    >
      <ImgShape />
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre">Cat</p>
    </div>
  );
}

function ImgShape1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Img+ shape">
      <div className="[grid-area:1_/_1] flex h-[187.347px] items-center justify-center ml-0 mt-[12px] relative w-[180px]">
        <div className="flex-none h-[187.347px] scale-y-[-100%] w-[180px]">
          <div className="relative size-full" data-name="Vector">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 180 188">
              <path d={svgPaths.p3b910800} fill="var(--fill-0, #F8F9FA)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex h-[191px] items-center justify-center ml-[11px] mt-0 relative w-[158px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[191px] relative w-[158px]" data-name="Img">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[140.72%] left-[-24.4%] max-w-none top-[-30.3%] w-[154.38%]" src={imgImg} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImgBgText1() {
  const router = useRouter();

  return (
    <div 
      className="content-stretch flex flex-col gap-[26px] items-center relative shrink-0 cursor-pointer transition-transform duration-300 hover:scale-110" 
      data-name="Img+bg+ text"
      onClick={() => router.push('/browse-pets')}
    >
      <ImgShape1 />
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre">Hamster</p>
    </div>
  );
}

function Group9() {
  return (
    <div className="[grid-area:1_/_1] h-[187.347px] ml-[3.13%] mt-[4.58%] relative w-[180px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 180 188">
        <g id="Group 9">
          <path d={svgPaths.p8856b80} fill="var(--fill-0, #F8F9FA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ImgShape2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Img+ shape">
      <Group9 />
      <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[192px]" data-name="Img">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImg17} />
      </div>
    </div>
  );
}

function ImgBgText2() {
  const router = useRouter();

  return (
    <div 
      className="content-stretch flex flex-col gap-[26px] items-center relative shrink-0 cursor-pointer transition-transform duration-300 hover:scale-110" 
      data-name="Img+bg+ text"
      onClick={() => router.push('/browse-pets')}
    >
      <ImgShape2 />
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre">Dog</p>
    </div>
  );
}

function ImgShape3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Img+ shape">
      <div className="[grid-area:1_/_1] flex h-[187.347px] items-center justify-center ml-[9px] mt-0 relative w-[180px]">
        <div className="flex-none h-[187.347px] scale-y-[-100%] w-[180px]">
          <div className="relative size-full" data-name="Vector">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 180 188">
              <path d={svgPaths.p3b910800} fill="var(--fill-0, #F8F9FA)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[180px]" data-name="Img">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImg18} />
      </div>
    </div>
  );
}

function ImgBgText3() {
  const router = useRouter();

  return (
    <div 
      className="content-stretch flex flex-col gap-[25px] items-center relative shrink-0 cursor-pointer transition-transform duration-300 hover:scale-110" 
      data-name="Img+bg+ text"
      onClick={() => router.push('/browse-pets')}
    >
      <ImgShape3 />
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre">Parrot</p>
    </div>
  );
}

function ImgShape4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Img+ shape">
      <div className="[grid-area:1_/_1] flex h-[187.347px] items-center justify-center ml-[20px] mt-[21px] relative w-[180px]">
        <div className="flex-none h-[187.347px] scale-y-[-100%] w-[180px]">
          <div className="relative size-full" data-name="Vector">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 180 188">
              <path d={svgPaths.p3b910800} fill="var(--fill-0, #F8F9FA)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[205px]" data-name="Img">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImg19} />
      </div>
    </div>
  );
}

function ImgBgText4() {
  const router = useRouter();

  return (
    <div 
      className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 cursor-pointer transition-transform duration-300 hover:scale-110" 
      data-name="Img+bg+ text"
      onClick={() => router.push('/browse-pets')}
    >
      <ImgShape4 />
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre">Rabbit</p>
    </div>
  );
}

function ImgShape5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Img+ shape">
      <div className="[grid-area:1_/_1] flex h-[187.347px] items-center justify-center ml-[20px] mt-0 relative w-[180px]">
        <div className="flex-none h-[187.347px] scale-y-[-100%] w-[180px]">
          <div className="relative size-full" data-name="Vector">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 180 188">
              <path d={svgPaths.p3b910800} fill="var(--fill-0, #F8F9FA)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex h-[154px] items-center justify-center ml-0 mt-[25px] relative w-[220px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[154px] relative w-[220px]" data-name="Img">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[142.42%] left-0 max-w-none top-[-32.89%] w-full" src={imgImg20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImgBgText5() {
  const router = useRouter();

  return (
    <div 
      className="content-stretch flex flex-col gap-[25px] items-center relative shrink-0 cursor-pointer transition-transform duration-300 hover:scale-110" 
      data-name="Img+bg+ text"
      onClick={() => router.push('/browse-pets')}
    >
      <ImgShape5 />
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre">Turtle</p>
    </div>
  );
}

function ImgsBgText() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-[1296px]" data-name="Imgs+ bg+ text">
      <ImgBgText />
      <ImgBgText1 />
      <ImgBgText2 />
      <ImgBgText3 />
      <ImgBgText4 />
      <ImgBgText5 />
    </div>
  );
}

function ShopByPet() {
  return (
    <div className="relative shrink-0 w-full" data-name="Browse by pet">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[60px] items-start px-[312px] py-[60px] relative w-full">
          <TextIcon15 />
          <ImgsBgText />
        </div>
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0" data-name="Text">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[48px] not-italic relative shrink-0 text-[40px] text-black text-nowrap whitespace-pre">{`News & Blog`}</p>
    </div>
  );
}

function Label() {
  return (
    <div className="absolute bg-black h-[28px] left-[20px] rounded-[20px] top-[20px] w-[100px]" data-name="Label">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[28px] items-center justify-center px-[40px] py-[17px] relative w-[100px]">
          <p className="font-['Poppins:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">News</p>
        </div>
      </div>
    </div>
  );
}

function ImgLabel() {
  return (
    <div className="h-[360px] overflow-clip relative shrink-0 w-[416px]" data-name="Img+ label">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[115.56%] left-[-12.5%] max-w-none top-0 w-[125%]" src={imgImgLabel} />
      </div>
      <Label />
    </div>
  );
}

function Text22() {
  return (
    <div className="box-border capitalize content-stretch flex flex-col gap-[12px] items-start leading-[32px] not-italic px-0 py-[20px] relative shrink-0" data-name="Text">
      <p className="font-['Poppins:Regular',sans-serif] overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)] text-nowrap whitespace-pre">24 May,2024</p>
      <p className="-webkit-box font-['Poppins:SemiBold',sans-serif] h-[69px] overflow-ellipsis overflow-hidden relative shrink-0 text-[20px] text-black w-[416px]">Urna cras et mauris congue nunc nisi nec tempus cursus</p>
    </div>
  );
}

function Card15() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[20px] shrink-0" data-name="Card">
      <ImgLabel />
      <Text22 />
    </div>
  );
}

function Label1() {
  return (
    <div className="absolute bg-black h-[28px] left-[20px] rounded-[20px] top-[20px] w-[100px]" data-name="Label">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[28px] items-center justify-center px-[40px] py-[17px] relative w-[100px]">
          <p className="font-['Poppins:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">News</p>
        </div>
      </div>
    </div>
  );
}

function ImgLabel1() {
  return (
    <div className="h-[360px] overflow-clip relative shrink-0 w-[416px]" data-name="Img+ label">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImgLabel1} />
      <Label1 />
    </div>
  );
}

function Text23() {
  return (
    <div className="box-border capitalize content-stretch flex flex-col gap-[12px] items-start leading-[32px] not-italic px-0 py-[20px] relative shrink-0" data-name="Text">
      <p className="font-['Poppins:Regular',sans-serif] overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)] text-nowrap whitespace-pre">24 May,2024</p>
      <p className="-webkit-box font-['Poppins:SemiBold',sans-serif] h-[69px] overflow-ellipsis overflow-hidden relative shrink-0 text-[20px] text-black w-[416px]">{`Id tellus dignissim eu nisl aliquam. Massa id interdum `}</p>
    </div>
  );
}

function Card16() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[20px] shrink-0" data-name="Card">
      <ImgLabel1 />
      <Text23 />
    </div>
  );
}

function Label2() {
  return (
    <div className="absolute bg-black h-[28px] left-[20px] rounded-[20px] top-[20px] w-[100px]" data-name="Label">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[28px] items-center justify-center px-[40px] py-[17px] relative w-[100px]">
          <p className="font-['Poppins:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">News</p>
        </div>
      </div>
    </div>
  );
}

function ImgLabel2() {
  return (
    <div className="h-[360px] overflow-clip relative shrink-0 w-[416px]" data-name="Img+ label">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImgLabel2} />
      <Label2 />
    </div>
  );
}

function Text24() {
  return (
    <div className="box-border capitalize content-stretch flex flex-col gap-[12px] items-start leading-[32px] not-italic px-0 py-[20px] relative shrink-0" data-name="Text">
      <p className="font-['Poppins:Regular',sans-serif] overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)] text-nowrap whitespace-pre">24 May,2024</p>
      <p className="-webkit-box font-['Poppins:SemiBold',sans-serif] h-[69px] overflow-ellipsis overflow-hidden relative shrink-0 text-[20px] text-black w-[416px]">mus cursus pellentesque blandit tortor suspendisse ornare</p>
    </div>
  );
}

function Card17() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[20px] shrink-0" data-name="Card">
      <ImgLabel2 />
      <Text24 />
    </div>
  );
}

function Cards3() {
  return (
    <div className="content-stretch flex gap-[24px] items-end relative shrink-0 w-full" data-name="Cards">
      <Card15 />
      <Card16 />
      <Card17 />
    </div>
  );
}

function NewsBlog() {
  return (
    <div className="relative shrink-0 w-full" data-name="News & blog">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[60px] items-center px-[312px] py-[60px] relative w-full">
          <Text21 />
          <Cards3 />
        </div>
      </div>
    </div>
  );
}

function Vector1() {
  return (
    <div className="absolute inset-[2.14%_45%_9.49%_11.93%]" data-name="Vector">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 828 369">
        <g id="Vector">
          <path d={svgPaths.p3ef67380} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_592_" />
          <path d={svgPaths.p15a57d80} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_593_" />
          <path d={svgPaths.p3c15d900} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_594_" />
          <path d={svgPaths.p9ce1500} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_595_" />
          <path d={svgPaths.p22fd5780} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_596_" />
          <path d={svgPaths.p139a6700} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_597_" />
          <path d={svgPaths.p24602500} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_598_" />
          <path d={svgPaths.p415ea00} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_599_" />
          <path d={svgPaths.p12005b00} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_600_" />
          <path d={svgPaths.p3d1d6e80} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_601_" />
          <path d={svgPaths.pf4c9080} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_602_" />
          <path d={svgPaths.p1c4fcc80} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_603_" />
          <path d={svgPaths.p14481af0} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_604_" />
          <path d={svgPaths.p2c7835b2} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_605_" />
          <path d={svgPaths.p2378e880} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_567_" />
          <path d={svgPaths.p5410400} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_566_" />
          <path d={svgPaths.p6b6e180} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_565_" />
          <path d={svgPaths.p27834300} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_609_" />
          <path d={svgPaths.p22d98f80} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_610_" />
          <path d={svgPaths.p390ec780} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_611_" />
          <path d={svgPaths.p350edd00} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_612_" />
          <path d={svgPaths.p2b06c00} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_613_" />
          <path d={svgPaths.p322a9b00} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_614_" />
          <path d={svgPaths.pfa3e370} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_615_" />
          <path d={svgPaths.p2d681740} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_616_" />
          <path d={svgPaths.p2151f480} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_617_" />
          <path d={svgPaths.p2bb17300} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_618_" />
          <path d={svgPaths.p2ee79500} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_619_" />
          <path d={svgPaths.p1b2de000} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_620_" />
          <path d={svgPaths.p8bf7620} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_564_" />
          <path d={svgPaths.p1f105900} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_563_" />
          <path d={svgPaths.paba9571} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_562_" />
          <path d={svgPaths.p39f3bc00} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_624_" />
          <path d={svgPaths.p3bb3a300} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_552_" />
          <path d={svgPaths.p1eddfb70} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_626_" />
          <path d={svgPaths.p286dbe00} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_551_" />
          <path d={svgPaths.p26a4cc00} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_550_" />
          <path d={svgPaths.p7c64d00} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_549_" />
          <path d={svgPaths.p36fb0100} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_548_" />
          <path d={svgPaths.p34e9f880} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_547_" />
          <path d={svgPaths.p25e6c480} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_546_" />
          <path d={svgPaths.p39ead680} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_545_" />
          <path d={svgPaths.pc2e9880} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_544_" />
          <path d={svgPaths.p22c65000} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_534_" />
          <path d={svgPaths.p1b92df00} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_533_" />
          <path d={svgPaths.p2c1a1880} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_532_" />
          <path d={svgPaths.p2c249880} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_531_" />
          <path d={svgPaths.p3df82500} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_530_" />
          <path d={svgPaths.p263673f2} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_529_" />
          <path d={svgPaths.p10d42c40} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_528_" />
          <path d={svgPaths.p3c532200} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_527_" />
          <path d={svgPaths.p17cb30c0} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_526_" />
          <path d={svgPaths.p3fc47a00} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_525_" />
          <path d={svgPaths.p3b5f44c0} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_524_" />
          <path d={svgPaths.p3d1f8e00} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_523_" />
          <path d={svgPaths.p5801b00} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_522_" />
          <path d={svgPaths.p380f1f80} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_521_" />
          <path d={svgPaths.p1ee7d600} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_520_" />
          <path d={svgPaths.p3ba9d400} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_519_" />
          <path d={svgPaths.p291c0300} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_518_" />
          <path d={svgPaths.p164c9300} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_517_" />
          <path d={svgPaths.p3628a100} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_516_" />
          <path d={svgPaths.p36aab6a0} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_515_" />
          <path d={svgPaths.p1b8f3700} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_514_" />
          <path d={svgPaths.p1ef27b80} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_513_" />
          <path d={svgPaths.p2e0ab700} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_512_" />
          <path d={svgPaths.p3087e000} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_511_" />
          <path d={svgPaths.p7287e80} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_510_" />
          <path d={svgPaths.p28ad20f1} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_488_" />
          <path d={svgPaths.p1587c7f0} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_487_" />
          <path d={svgPaths.p39e2180} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_662_" />
          <path d={svgPaths.p1d60a000} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_663_" />
          <path d={svgPaths.p10ee9700} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_486_" />
          <path d={svgPaths.p2683ce40} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_485_" />
          <path d={svgPaths.p17c1cf90} fill="var(--fill-0, black)" fillOpacity="0.05" id="XMLID_482_" />
        </g>
      </svg>
    </div>
  );
}

function Group10() {
  return (
    <div className="h-[24px] relative shrink-0 w-[29.273px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 24">
        <g id="Group">
          <path d={svgPaths.p36bf03f0} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p278b3300} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p2a5b3200} fill="var(--fill-0, black)" id="Vector_3" />
          <path d={svgPaths.p9434500} fill="var(--fill-0, black)" id="Vector_4" />
          <path d={svgPaths.p132aae80} fill="var(--fill-0, black)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function Logo6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Logo">
      <Group10 />
      <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre">Pet Shop</p>
    </div>
  );
}

function Group11() {
  return (
    <div className="h-[24px] relative shrink-0 w-[23.994px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <path d={svgPaths.p3ffbf070} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p3fbe6000} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group12() {
  return (
    <div className="h-[24px] relative shrink-0 w-[23.993px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <path d={svgPaths.p1ee74500} fill="var(--fill-0, black)" id="Vector" />
          <g id="Group_2">
            <path d={svgPaths.p30ac2f00} fill="var(--fill-0, white)" id="Vector_2" />
            <path d={svgPaths.p3c2de570} fill="var(--fill-0, white)" id="Vector_3" />
            <path d={svgPaths.p2e95f600} fill="var(--fill-0, white)" id="Vector_4" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group13() {
  return (
    <div className="h-[24px] relative shrink-0 w-[23.994px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <path d={svgPaths.p3ffbf070} fill="var(--fill-0, black)" id="Vector" />
          <g id="layer1">
            <path d={svgPaths.p16331f00} fill="var(--fill-0, white)" id="path1009" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group14() {
  return (
    <div className="h-[24px] relative shrink-0 w-[23.993px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <path d={svgPaths.p1b9db380} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p1485b200} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function SocialIcons() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0" data-name="Social icons">
      <Group11 />
      <Group12 />
      <Group13 />
      <Group14 />
    </div>
  );
}

function LogoTextIcons() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative self-stretch shrink-0" data-name="Logo+text+ icons">
      <Logo6 />
      <p className="-webkit-box font-['Poppins:Regular',sans-serif] h-[62px] leading-[1.283] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-black w-[349px]">Sed viverra eget fames sit varius. Pellentesque mattis libero viverra dictumst ornaresed justo convallis vitae</p>
      <SocialIcons />
    </div>
  );
}

function Text25() {
  return (
    <div className="content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[16px] items-start leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" data-name="Text">
      <p className="overflow-ellipsis overflow-hidden relative shrink-0">About Us</p>
      <p className="overflow-ellipsis overflow-hidden relative shrink-0">Blog</p>
      <p className="overflow-ellipsis overflow-hidden relative shrink-0">Gift cards</p>
      <p className="overflow-ellipsis overflow-hidden relative shrink-0">Careers</p>
    </div>
  );
}

function Text26() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0" data-name="Text">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[normal] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre">Company</p>
      <Text25 />
    </div>
  );
}

function Text27() {
  return (
    <div className="content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[16px] items-start leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" data-name="Text">
      <p className="overflow-ellipsis overflow-hidden relative shrink-0">New products</p>
      <p className="overflow-ellipsis overflow-hidden relative shrink-0">Best sellers</p>
      <p className="overflow-ellipsis overflow-hidden relative shrink-0">Discount</p>
      <p className="overflow-ellipsis overflow-hidden relative shrink-0">F.A.Q</p>
    </div>
  );
}

function Text28() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0" data-name="Text">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[normal] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre">Useful Links</p>
      <Text27 />
    </div>
  );
}

function Text29() {
  return (
    <div className="content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[16px] items-start leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" data-name="Text">
      <p className="overflow-ellipsis overflow-hidden relative shrink-0">Contact Us</p>
      <p className="overflow-ellipsis overflow-hidden relative shrink-0">Shipping</p>
      <p className="overflow-ellipsis overflow-hidden relative shrink-0">Returns</p>
      <p className="overflow-ellipsis overflow-hidden relative shrink-0">Order tracking</p>
    </div>
  );
}

function Text30() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0" data-name="Text">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[normal] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre">Customer Service</p>
      <Text29 />
    </div>
  );
}

function Text31() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[20px] not-italic relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" data-name="Text">
      <p className="font-['Poppins:Medium',sans-serif] relative shrink-0">+775 378-6348</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0">rgarton@outlook.com</p>
    </div>
  );
}

function Text32() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0" data-name="Text">
      <div className="font-['Poppins:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre">
        <p className="mb-0">{`8592 Fairground St. `}</p>
        <p>Tallahassee, FL 32303</p>
      </div>
      <Text31 />
    </div>
  );
}

function Text33() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0" data-name="Text">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[normal] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre">Store</p>
      <Text32 />
    </div>
  );
}

function IconsText1() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[1296px]" data-name="Icons+ text">
      <LogoTextIcons />
      <Text26 />
      <Text28 />
      <Text30 />
      <Text33 />
    </div>
  );
}

function PaymentIcons() {
  return (
    <div className="h-[25px] relative shrink-0 w-[263px]" data-name="payment-icons 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 263 25">
        <g clipPath="url(#clip0_1_693)" id="payment-icons 1">
          <path clipRule="evenodd" d={svgPaths.p8cbcb00} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" opacity="0.8" />
        </g>
        <defs>
          <clipPath id="clip0_1_693">
            <rect fill="white" height="25" width="263" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TextIcons1() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Text+ icons">
      <p className="font-['Poppins:Regular',sans-serif] leading-[26px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.5)] text-nowrap whitespace-pre">{` © Copyright Pet Shop  2025. Design by Figma. guru`}</p>
      <PaymentIcons />
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#f8f9fa] relative shrink-0 w-full" data-name="Footer">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[60px] items-center px-[312px] py-[72px] relative w-full">
          <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.22288373112678528)+(var(--transform-inner-height)*0.9748450517654419)))] items-center justify-center left-[1751px] top-[326.94px] w-[calc(1px*((var(--transform-inner-height)*0.22288373112678528)+(var(--transform-inner-width)*0.9748450517654419)))]" style={{ "--transform-inner-width": "174", "--transform-inner-height": "185" } as React.CSSProperties}>
            <div className="flex-none rotate-[12.878deg] scale-y-[-100%]">
              <div className="h-[185.08px] relative w-[173.863px]" data-name="Vector">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 174 186">
                  <path d={svgPaths.p171ddb80} fill="url(#paint0_linear_1_1072)" id="Shape" />
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1072" x1="-7.41036e-08" x2="184.719" y1="185.08" y2="11.5562">
                      <stop stopColor="#F87537" />
                      <stop offset="1" stopColor="#FBA81F" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
          <Vector1 />
          <IconsText1 />
          <TextIcons1 />
        </div>
      </div>
    </div>
  );
}

interface HomepageProps {
  userRole?: UserRole;
}

export default function Homepage({ userRole }: HomepageProps) {
  const isAdmin = userRole === 'admin';
  
  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden content-stretch flex flex-col items-center size-full" data-name="Homepage">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#fd7e14] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#fd7e14] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#fd7e14] to-[#ff9247] opacity-3 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Scattered Paw Print Pattern Decorations with Fade in/out Animation - Unsynchronized */}
      <div className="absolute top-[15%] left-[8%] text-[#fd7e14] opacity-0 animate-[fadeInOut_3.2s_0s_infinite] pointer-events-none">
        <PawPrint className="w-12 h-12" />
      </div>
      <div className="absolute top-[25%] right-[12%] text-[#fd7e14] opacity-0 animate-[fadeInOut_6.5s_1.3s_infinite] pointer-events-none">
        <PawPrint className="w-20 h-20" />
      </div>
      <div className="absolute top-[45%] left-[5%] text-[#fd7e14] opacity-0 animate-[fadeInOut_4.8s_2.7s_infinite] pointer-events-none">
        <PawPrint className="w-16 h-16" />
      </div>
      <div className="absolute top-[60%] right-[18%] text-[#fd7e14] opacity-0 animate-[fadeInOut_5.3s_0.4s_infinite] pointer-events-none">
        <PawPrint className="w-14 h-14" />
      </div>
      <div className="absolute bottom-[20%] left-[15%] text-[#fd7e14] opacity-0 animate-[fadeInOut_7.1s_1.8s_infinite] pointer-events-none">
        <PawPrint className="w-10 h-10" />
      </div>
      <div className="absolute bottom-[35%] right-[8%] text-[#fd7e14] opacity-0 animate-[fadeInOut_3.7s_3.2s_infinite] pointer-events-none">
        <PawPrint className="w-18 h-18" />
      </div>
      <div className="absolute top-[70%] left-[22%] text-[#fd7e14] opacity-0 animate-[fadeInOut_6.2s_0.9s_infinite] pointer-events-none">
        <PawPrint className="w-12 h-12" />
      </div>
      <div className="absolute top-[35%] right-[25%] text-[#fd7e14] opacity-0 animate-[fadeInOut_4.3s_2.1s_infinite] pointer-events-none">
        <PawPrint className="w-11 h-11" />
      </div>
      <div className="absolute bottom-[45%] left-[30%] text-[#fd7e14] opacity-0 animate-[fadeInOut_5.9s_1.5s_infinite] pointer-events-none">
        <PawPrint className="w-13 h-13" />
      </div>
      <div className="absolute top-[55%] right-[35%] text-[#fd7e14] opacity-0 animate-[fadeInOut_3.5s_2.8s_infinite] pointer-events-none">
        <PawPrint className="w-15 h-15" />
      </div>
      
      <Hero userRole={userRole} />
      {!isAdmin && <AvailablePetsSlider />}
      <OurImpact />
    </div>
  );
}
