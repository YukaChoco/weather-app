
import { Prefectures } from '../_domain/PrefecturesEntity'
import prefectureData from '../_data/prefectureData'
import { City } from '../_domain/CoordinatesEntity'

export const PrefectureSelecter = ({ location }: { location: City }) => {

  const PrefectureOption = prefectureData.map(prefecture => {
    return (
      <option key={prefecture.id} value={prefecture.id}>{prefecture.name}</option>
    )
  })

  return (
    <select>
      {PrefectureOption}
    </select>
  )
}
