import { FaInstagram } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

function Footer() {
  return (
    <footer style={{backgroundColor: "black", color: "white", position: "relative", bottom: 0, width: "100%", transform: "translateY(0%)", minHeight: "10px"}}>
      <div>
        <div style={{paddingLeft: "50px", paddingTop: "10px", paddingBottom: "10px", textAlign: "left"}}>
            <Button
                href="https://www.instagram.com/asca_knu?igsh=ZnIzeXIzdmd5ejlt"
                target="_blank"
                aria-label="Instagram"
                className="border-0 bg-transparent p-0 d-flex align-items-center justify-content-center shadow-none"
                style={{ width: 30, height: 30 }}
            >
                <FaInstagram size={40} />
                {/* <hr style={{color: "white", width: "90%" }}/> */}
            </Button>
            
        </div>
        <hr style={{margin: "0 50px"}}/>
        <p style={{paddingLeft: "50px", textAlign: "left"}}>© 2025 ASCA. All rights reserved.</p>
        <p style={{paddingLeft: "50px", textAlign: "left"}}><b>회장</b><br/>송수민 010-5455-9598</p>
        <p style={{paddingLeft: "50px", textAlign: "left"}}><b>부회장</b><br/>장준영 010-6667-6334</p>
        <p style={{paddingLeft: "50px", paddingBottom: "20px", margin: 0, textAlign: "left"}}><b>그림부장</b><br/>김지훈 010-2195-9560</p>
      </div>
    </footer>
  );
}

export default Footer;