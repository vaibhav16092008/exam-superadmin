"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/styles/CustomCursor.module.css';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [trail, setTrail] = useState([]);
    const [isClickable, setIsClickable] = useState(false);
    const [isInput, setIsInput] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });

            // Add new position to trail
            setTrail(prev => {
                const newTrail = [...prev, {
                    x: e.clientX,
                    y: e.clientY,
                    isClickable: window.getComputedStyle(e.target).getPropertyValue('cursor') === 'pointer',
                    isInput: e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA'
                }];
                return newTrail.slice(-5); // Keep last 5 positions
            });

            // Check if hovering over clickable element
            const target = e.target;
            setIsClickable(
                window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer' ||
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('button') ||
                target.closest('a')
            );

            // Check if hovering over input field
            setIsInput(
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.closest('input') ||
                target.closest('textarea')
            );
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    return (
        <>
            {/* Main cursor */}
            <div
                className={`${styles.cursorMain} ${isClickable ? styles.clickable : ''} ${isInput ? styles.input : ''}`
                }
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                }}
            >
                {isInput && <div className={styles.caret} />}
            </div>

            {/* Trail elements */}
            {trail.map((pos, index) => (
                <div
                    key={index}
                    className={`${styles.cursorTrail} ${pos.isClickable ? styles.trailClickable : ''} ${pos.isInput ? styles.trailInput : ''}`
                    }
                    style={{
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                        opacity: 0.2 + (index / trail.length * 0.5),
                        transform: `translate(-50%, -50%) scale(${0.5 + (index / trail.length * 0.5)})`
                    }}
                />
            ))}
        </>
    );
};

export default CustomCursor;