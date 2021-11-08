import { PageWithLayout } from '@/components/page'
import Viewport, { setAnim } from '@/components/viewport'
import { BuyDetail, SellDetail } from '@prisma/client'
import useSWR from 'swr'

const monts = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

type Reports = {
  sellDetails: SellDetail[]
  buyDetails: BuyDetail[]
}

const Index: PageWithLayout = () => {
  const { data } = useSWR<Reports>(() => `/api/reports`)
  return (
    <div className="py-4 c-lg">
      {data ? (
        <Viewport className="w-full animate" once style={setAnim({ y: '-0.3rem' })}>
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center sm:mb-0">
                <h2 className="font-bold leading-normal text-2xl">
                  Dashboard
                </h2>
              </div>
              <h3 className="leading-normal">
                Reportes generales del último mes - {monts[new Date().getMonth()]} de {new Date().getFullYear()}
              </h3>
            </div>
            <div className="mx-auto w-full grid pb-16 gap-6 grid-cols-1 sm:grid-cols-4 lg:w-9/10">
              <div className="bg-bg-secondary rounded-lg flex flex-col space-y-2 shadow text-right w-full p-4">
                <h4 className="font-bold text-lg">Productos vendidos:</h4>
                <p className="font-bold text-4xl">~{data.sellDetails.map(p => p.quantity).reduce((a, b) => a + b, 0)}</p>
              </div>
              <div className="bg-bg-secondary rounded-lg flex flex-col space-y-2 shadow text-right w-full p-4">
                <h4 className="font-bold text-lg">Ganancias totales:</h4>
                <p className="font-bold text-green-500 text-4xl">${data.sellDetails.map(p => p.price * p.quantity).reduce((a, b) => a + b, 0).toFixed(2)}</p>
              </div>
              <div className="bg-bg-secondary rounded-lg flex flex-col space-y-2 shadow text-right w-full p-4">
                <h4 className="font-bold text-lg">Productos solicitados:</h4>
                <p className="font-bold text-4xl">~{data.buyDetails.map(p => p.quantity).reduce((a, b) => a + b, 0)}</p>
              </div>
              <div className="bg-bg-secondary rounded-lg flex flex-col space-y-2 shadow text-right w-full p-4">
                <h4 className="font-bold text-lg">Inversión total:</h4>
                <p className="font-bold text-red-500 text-4xl">${data.buyDetails.map(p => p.price * p.quantity).reduce((a, b) => a + b, 0).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </Viewport>
      ) : null}
    </div>
  )
}

export default Index
