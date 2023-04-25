import React, { RefObject, useEffect, useRef } from 'react'

export function ProposalBlocks({ votes }: { votes: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = () => drawCanvas(canvasRef, votes)
  useEffect(() => draw(), [votes])
  // Canvas should resize as window size changes
  useEffect(() => {
    window.addEventListener('resize', draw)
    return () => {
      window.removeEventListener('resize', draw)
    }
  }, [])

  return (
    <div className={`${!votes && 'invisible'} flex items-center justify-center space-x-3 sm:my-0 my-3`}>
      <i className="pr-1.5 text-right opacity-70">
        Credits
        <br className="block sm:hidden" /> allocated:
      </i>
      <i>{votes ** 2}</i>
      <div className="relative w-20 h-20">
        <canvas className="relative w-full h-full" ref={canvasRef} />
      </div>
    </div>
  )
}

/** Logic to modify the canvas */
const drawCanvas = (canvasRef: RefObject<HTMLCanvasElement>, votes: number) => {
  const totalHeightBlocks = votes
  if (!canvasRef.current) return

  const canvas = canvasRef.current
  const ctx = canvas.getContext('2d')

  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // First: Setup the canvas dimensions
  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight
  var w = canvas.width,
    h = canvas.height

  // set the scale of the context
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

  // scale the canvas by window.devicePixelRatio
  canvas.width = w * window.devicePixelRatio
  canvas.height = h * window.devicePixelRatio

  // Second: Draw the graph
  const maxCellHeight = window.innerWidth < 768 ? 16 : 10
  const cellHeight = Math.min(canvas.height / totalHeightBlocks, maxCellHeight)
  const blockHeight = cellHeight * 0.7
  const gutter = cellHeight - blockHeight
  const px = (canvas.width - cellHeight * totalHeightBlocks) / 2
  const py = (canvas.height - cellHeight * totalHeightBlocks) / 2
  for (let j = 0; j < totalHeightBlocks; j++) {
    for (let i = 0; i < totalHeightBlocks; i++) {
      const x = px + (blockHeight + gutter) * i
      const y = py + (blockHeight + gutter) * j + gutter / 2
      ctx.fillStyle = '#fffa'
      ctx.fillRect(x, y, blockHeight, blockHeight)
    }
  }
}
