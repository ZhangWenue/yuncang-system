import {create} from 'zustand';

const useStore = create((set) => ({
  message: 'message',
  description: 'description',
  type: '',
  
  setType: (type) => set({type}),
  setMessage: (message) => set({message}),
  setDescription: (description) => set({description})
}))

export default useStore