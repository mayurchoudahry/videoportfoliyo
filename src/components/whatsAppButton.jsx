"use client";
import React, { useState } from 'react';
import Image from 'next/image';
const WhatsAppButton = () => {

    const handleWhatsApp = () => {
        const phoneNumber = '+916378942409'; // Replace with your actual WhatsApp number
        const message = 'Hi! I saw your video portfolio and would like to discuss a project.';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div
            onClick={handleWhatsApp}
            className="bg-[#25D366] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            aria-label="Contact on WhatsApp"
        >
            <Image
                src={"./WhatsappHeader.svg"}
                width={24}
                height={24}
                alt="WhatsApp" className="w-7 h-7 md:w-8 md:h-8" />
        </div>

    );
};

export default WhatsAppButton; 