export const LocationIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height="1.4em"
    width="1.4em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="none"
      stroke="#000"
      stroke-width="2"
      d="M12,22 C12,22 4,16 4,10 C4,5 8,2 12,2 C16,2 20,5 20,10 C20,16 12,22 12,22 Z M12,13 C13.657,13 15,11.657 15,10 C15,8.343 13.657,7 12,7 C10.343,7 9,8.343 9,10 C9,11.657 10.343,13 12,13 L12,13 Z"
    ></path>
  </svg>
);

export const BentoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="#000"
    style="opacity:1;"
  >
    <path d="M14.308 11.5V5.885H19.5q.69 0 1.153.462t.463 1.153v4zM4.5 18.116q-.69 0-1.153-.463T2.885 16.5v-9q0-.69.462-1.153T4.5 5.884h8.808v12.232zm3.596-5.077q.433 0 .736-.304q.302-.302.302-.735t-.302-.736q-.303-.303-.736-.303t-.736.303q-.302.303-.302.736t.302.735t.736.303m6.212 5.078V12.5h6.808v4q0 .69-.463 1.153t-1.153.463z" />
  </svg>
);

export const SearchIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export const CloseIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const ArrowIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);