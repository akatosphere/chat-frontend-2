import { Background } from "@/shared/background/ui/Background"
import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout"

type BackgroundPagelayoutProps = {
  children: React.ReactNode
  backgrountCardLayout: "start" | "form"
}
  
export const BackgroundPagelayout = ( { children, backgrountCardLayout = "start" }: BackgroundPagelayoutProps ) => {

  return (
    <Background variant="default">
      <BackgroundCardLayout
        variant={backgrountCardLayout}
      > 
        { children }
      </BackgroundCardLayout>
    </Background>
  )
}
