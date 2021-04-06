import { useState, MouseEvent, useContext } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify'
import Rodal from 'rodal'
// files
import UserContext from '../contexts/UserContext'
import { db } from '../configs/firebaseConfig'

export interface MyModalProps {
  isOpen: boolean
  closeModal: () => void
  roompyId: string
}

export default function MyModal({
  isOpen,
  closeModal,
  roompyId,
}: MyModalProps) {
  // state
  const [reportMessage, setReportMessage] = useState<string>('')
  const [types] = useState([
    {
      value: 1,
      label: 'Suspected scammer',
    },
    {
      value: 2,
      label: 'Contains incorrect information',
    },
    {
      value: 3,
      label: 'Bug or problem with the website',
    },
    {
      value: 4,
      label: 'Spam or commercial unrelated to roompy',
    },
    {
      value: 5,
      label: 'Contains offensive or inappropriate content',
    },
  ])
  const [selectedTypes, setSelectedTypes] = useState(null) // object

  // UserContext
  const { user } = useContext(UserContext)

  async function submitReport(e: MouseEvent) {
    e.preventDefault()

    // check input
    if (!reportMessage || !selectedTypes.value) {
      return toast.warning('Please fill in all the report field')
    }

    const report = {
      from: user.uid,
      for: roompyId,
      typeId: selectedTypes.value,
      desc: reportMessage,
    }

    // store to firestore
    await db.collection('reports').add(report)

    // after all done
    closeModal()
    toast.success(
      'Thanks for your report, we will review this roompies shortly'
    )
  }

  return (
    <Rodal
      animation="flip"
      closeOnEsc
      height={400}
      width={600}
      visible={isOpen}
      onClose={closeModal}
    >
      <section className="flex flex-col w-full h-full px-5 py-2">
        <p className="mb-4 text-2xl font-bold text-center text-purple-700">
          Report this roompies
        </p>

        <form>
          <label htmlFor="tipeLaporan">
            <Select
              className="w-full my-4"
              name="tipeLaporan"
              id="tipeLaporan"
              placeholder="Reasons for report..."
              required
              options={types}
              onChange={(type) => setSelectedTypes(type)}
            />
          </label>

          <label htmlFor="laporan">
            <textarea
              className="w-full p-3 my-2 bg-white border rounded-md outline-none appearance-none hover:border-purple-700 focus:border-purple-700"
              name="laporan"
              id="laporan"
              placeholder="Describe the issue here..."
              required
              rows={5}
              onChange={(e) => setReportMessage(e.target.value)}
              value={reportMessage}
            />
          </label>

          <button
            className="flex items-center justify-center w-full px-2 py-3 mt-4 text-sm font-bold tracking-wider text-purple-700 uppercase bg-purple-100 rounded-md text-FaShower focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 hover:text-white hover:bg-purple-700"
            type="submit"
            onClick={(e) => submitReport(e)}
          >
            Submit Report
          </button>
        </form>
      </section>
    </Rodal>
  )
}
