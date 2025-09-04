"use client"

import {
    Activity,
    Component,
    HomeIcon,
    Mail,
    Package,
    ScrollText,
    SunMoon,
    Video,
    Instagram,
    User
  } from 'lucide-react';
  import Image from 'next/image';
  
  import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
  
  const data = [
    {
      title: 'Home',
      icon: (
        <HomeIcon className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      href: '#Home',
    },
    {
      title: 'Work',
      icon: (
        <Video className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      href: '#Work',
    },
    {
      title: 'Contact',
      icon: (
        <User className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      href: '#Contact',
    },
    {
      title: 'WhatsApp',
      icon: (
        <Image
          src="/whatsapp.png"
          width={50}
          height={50}
          alt="WhatsApp"
          className="h-full w-full invert-[80%] p-0 m-0 "
        />
      ),
      href: 'whatsapp',
    },
    {
      title: 'Instagram',
      icon: (
        <Instagram className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      href: 'instagram',
    },
  ];
  
  export function Header() {
    const handleNavClick = (href) => {
      if (href === 'whatsapp') {
        const phoneNumber = '+916378942409';
        const message = 'Hi! I saw your video portfolio and would like to discuss a project.';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        return;
      }
      
      if (href === 'instagram') {
        const instagramUrl = 'https://instagram.com/_mayur_choudhary';
        window.open(instagramUrl, '_blank');
        return;
      }
      
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    return (
      <div className='fixed bottom-5 left-1/2 max-w-full -translate-x-1/2 z-50'>
        <Dock className='items-end pb-3'>
          {data.map((item, idx) => (
            <DockItem
              key={idx}
              className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 cursor-pointer'
              onClick={() => handleNavClick(item.href)}
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          ))}
        </Dock>
      </div>
    );
  }