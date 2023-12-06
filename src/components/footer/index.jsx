import React from 'react';
import {
    FacebookFilled,
    YoutubeFilled,
    InstagramFilled,
    LinkedinFilled,
} from '@ant-design/icons';
import './index.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-icon">
                <div>
                    <a href="https://facebook.com" type="text">
                        <FacebookFilled style={{ fontSize: '32px' }} />
                    </a>
                </div>
                <div>
                    <a type="text" href="https://youtube.com">
                        <YoutubeFilled style={{ fontSize: '32px' }} />
                    </a>
                </div>
                <div>
                    <a type="text" href="https://instagram.com">
                        <InstagramFilled style={{ fontSize: '32px' }} />
                    </a>
                </div>
                <div>
                    <a type="text" href="https://linked.com">
                        <LinkedinFilled style={{ fontSize: '32px' }} />
                    </a>
                </div>
            </div>
            <div className="copyright">
                <p>Công nghệ Web và dịch vụ trực tuyến &copy; Nhóm 3</p>
            </div>
        </footer>
    );
};

export default Footer;
