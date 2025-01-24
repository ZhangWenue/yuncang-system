import {create} from 'zustand';

const useStore = create((set) => ({
  title: 'title',
  content: 'content',
  isModalOpen: false,
  
  setTitle: (title) => set({title}),
  setContent: (content) => set({content}),
  setIsModalOpen: (isModalOpen) => set({isModalOpen})
}))

export default useStore