import React from 'react';

interface FloatingButtonProps {
  icon: JSX.Element;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  onClick: () => void;
  children?: React.ReactNode;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon,
  position,
  onClick,
  children,
}) => {
  const getPositionStyle = (): React.CSSProperties => {
    switch (position) {
      case 'top-left':
        return { position: 'relative', top: '20px', left: '20px' };
      case 'top-right':
        return { top: '20px', right: '20px' };
      case 'bottom-left':
        return { bottom: '20px', left: '20px' };
      case 'bottom-right':
        return { bottom: '20px', right: '20px' };
      default:
        return {};
    }
  };

  return (
    <button
      className="floating-button"
      style={getPositionStyle()}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
};

export default FloatingButton;
