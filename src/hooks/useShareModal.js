import { useState } from 'react';
import ShareModal from '../components/ShareModal';
export default function useShareModal() {
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const openShareModal = () => setShareModalOpen(true);
  const closeShareModal = () => setShareModalOpen(false);

  return { closeShareModal, openShareModal, shareModalOpen, ShareModal };
}
