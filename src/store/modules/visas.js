import { visas } from '@/assets/js/visas'
import { documentChecklist } from '@/assets/js/documentChecklist'

export default {
  namespaced: true,
  state: {
    visaList: visas,
    documentChecklist: documentChecklist
  }
}
