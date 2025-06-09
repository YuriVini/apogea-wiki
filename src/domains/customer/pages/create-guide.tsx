import { Footer } from '../../../components/footer'
import { useState, useEffect } from 'react'
import { Api } from '../../../@api/axios'
import { Header } from '../../../components/header'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { useUpload } from '../../../hooks/uploads'

interface StepImageFile {
  file: File
  preview: string
}

export const CreateGuide = () => {
  const navigate = useNavigate()
  const { uploadFileToS3 } = useUpload()
  const [guide, setGuide] = useState<GuidesApiTypes.Guide>({
    title: '',
    description: '',
    steps: [{ title: '', description: '' }],
  } as GuidesApiTypes.Guide)
  const [pendingImages, setPendingImages] = useState<Record<number, StepImageFile>>({})

  const handleUpdateGuide = (field: keyof GuidesApiTypes.Guide, value: string) => {
    setGuide({ ...guide, [field]: value })
  }

  const handleUpdateStep = (index: number, updatedStep: GuidesApiTypes.GuideStep) => {
    const newSteps = [...guide.steps]
    newSteps[index] = updatedStep
    setGuide({ ...guide, steps: newSteps })
  }

  const handleAddStep = () => {
    setGuide({
      ...guide,
      steps: [...guide.steps, { title: '', description: '' }],
    })
  }

  const handleRemoveStep = (index: number) => {
    const newSteps = guide.steps.filter((_, i) => i !== index)
    setGuide({ ...guide, steps: newSteps })
  }

  const handleToggleStepProperty = (index: number, property: keyof GuidesApiTypes.GuideStep) => {
    const step = guide.steps[index]
    const newSteps = [...guide.steps]

    if (step[property] !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [property]: _, ...stepWithoutProperty } = step
      newSteps[index] = stepWithoutProperty as GuidesApiTypes.GuideStep
    } else {
      let defaultValue: string | string[] = ''
      if (property === 'item') {
        defaultValue = []
      }
      newSteps[index] = { ...step, [property]: defaultValue }
    }

    // If we're removing the image_url property, also remove any pending image
    if (property === 'image_url' && pendingImages[index]) {
      URL.revokeObjectURL(pendingImages[index].preview)
      const newPendingImages = { ...pendingImages }
      delete newPendingImages[index]
      setPendingImages(newPendingImages)
    }

    setGuide({ ...guide, steps: newSteps })
  }

  const handleUpdateItems = (stepIndex: number, items: string[]) => {
    const newSteps = [...guide.steps]
    newSteps[stepIndex] = { ...newSteps[stepIndex], item: items }
    setGuide({ ...guide, steps: newSteps })
  }

  const handleRemoveItem = (stepIndex: number, itemIndex: number) => {
    const newSteps = [...guide.steps]
    const newItems = [...(newSteps[stepIndex].item || [])]
    newItems.splice(itemIndex, 1)
    newSteps[stepIndex] = { ...newSteps[stepIndex], item: newItems }
    setGuide({ ...guide, steps: newSteps })
  }

  const handleImageSelect = (index: number, file: File) => {
    const preview = URL.createObjectURL(file)
    setPendingImages((prev) => ({
      ...prev,
      [index]: { file, preview },
    }))
  }

  const handleCreateGuide = async () => {
    if (!guide.title.trim() || !guide.description.trim()) {
      toast.error('Por favor, preencha o título e a descrição do guia.')
      return
    }

    if (guide.steps.some((step) => !step.title.trim() || !step.description.trim())) {
      toast.error('Por favor, preencha o título e a descrição de todos os passos.')
      return
    }

    try {
      // Upload all pending images first
      const newSteps = [...guide.steps]
      for (const [index, imageData] of Object.entries(pendingImages)) {
        const stepIndex = parseInt(index)
        const fileName = await uploadFileToS3(imageData.file, 'guides')
        newSteps[stepIndex] = { ...newSteps[stepIndex], image_url: fileName }
      }

      // Update guide with new image URLs
      const updatedGuide = { ...guide, steps: newSteps }

      const response = await Api.post<GuidesApiTypes.GuideCreateResponse>('/guides', updatedGuide)
      toast.success('Guia criado com sucesso!')
      navigate(`/guides/${response.data.guideId}`)
    } catch {
      toast.error('Erro ao criar guia.')
    }
  }

  const handleFinishStepEditing = (index: number) => {
    // If there's a pending image, update the step with its preview URL
    if (pendingImages[index]) {
      const newSteps = [...guide.steps]
      newSteps[index] = { ...newSteps[index], image_url: pendingImages[index].preview }
      setGuide({ ...guide, steps: newSteps })
    }
  }

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      Object.values(pendingImages).forEach((image) => {
        URL.revokeObjectURL(image.preview)
      })
    }
  }, [pendingImages])

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <div className='max-w-4xl mx-auto p-4 sm:p-6 lg:p-8'>
        <div className='mb-6'>
          <h1 className='text-3xl sm:text-4xl font-bold text-white animate-fade-in-down'>Criar Novo Guia</h1>
        </div>

        <div className='mb-6'>
          <label className='block text-white font-medium mb-2'>Título do Guia:</label>
          <input
            type='text'
            value={guide.title}
            onChange={(e) => handleUpdateGuide('title', e.target.value)}
            className='text-2xl sm:text-4xl font-bold bg-gray-800/30 text-white rounded px-4 py-2 w-full'
            placeholder='Digite o título do guia...'
          />
        </div>

        <div className='mb-8 sm:mb-12'>
          <label className='block text-white font-medium mb-2'>Descrição:</label>
          <textarea
            value={guide.description}
            onChange={(e) => handleUpdateGuide('description', e.target.value)}
            className='text-gray-300 w-full bg-gray-800/30 rounded p-4'
            rows={3}
            placeholder='Digite a descrição do guia...'
          />
        </div>

        <div className='space-y-8 sm:space-y-12'>
          {guide?.steps?.map((step, index) => (
            <div key={index} className='bg-gray-800/30 rounded-lg p-4 sm:p-6 transform hover:scale-[1.02] transition-all duration-300 hover:bg-gray-700/30 shadow-lg hover:shadow-xl'>
              <div className='space-y-4'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center'>
                  <h3 className='text-xl font-semibold text-white mb-2 sm:mb-0'>Passo {index + 1}</h3>
                  {guide.steps.length > 1 && (
                    <button onClick={() => handleRemoveStep(index)} className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors'>
                      🗑️ Remover Passo
                    </button>
                  )}
                </div>

                <input
                  type='text'
                  value={step.title}
                  onChange={(e) => handleUpdateStep(index, { ...step, title: e.target.value })}
                  className='text-xl font-semibold bg-gray-800/30 text-white rounded px-3 py-2 w-full'
                  placeholder='Título do passo...'
                />

                <textarea
                  value={step.description}
                  onChange={(e) => handleUpdateStep(index, { ...step, description: e.target.value })}
                  className='text-gray-300 w-full bg-gray-800/30 rounded p-3'
                  rows={3}
                  placeholder='Descrição do passo...'
                />

                <div className='flex flex-wrap gap-2'>
                  <button
                    onClick={() => handleToggleStepProperty(index, 'hint')}
                    className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                      step.hint !== undefined ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    💡 Dica {step.hint !== undefined ? '✓' : ''}
                  </button>
                  <button
                    onClick={() => handleToggleStepProperty(index, 'item')}
                    className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                      step.item !== undefined ? 'bg-green-600 text-white shadow-md' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    🎒 Itens {step.item !== undefined ? '✓' : ''}
                  </button>
                  <button
                    onClick={() => handleToggleStepProperty(index, 'note')}
                    className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                      step.note !== undefined ? 'bg-yellow-500 text-white shadow-md' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    📝 Nota {step.note !== undefined ? '✓' : ''}
                  </button>
                  <button
                    onClick={() => handleToggleStepProperty(index, 'benefit')}
                    className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                      step.benefit !== undefined ? 'bg-green-400 text-white shadow-md' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    ✨ Benefício {step.benefit !== undefined ? '✓' : ''}
                  </button>
                  <button
                    onClick={() => handleToggleStepProperty(index, 'advice')}
                    className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                      step.advice !== undefined ? 'bg-purple-500 text-white shadow-md' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    🔮 Recomendação {step.advice !== undefined ? '✓' : ''}
                  </button>
                  <button
                    onClick={() => handleToggleStepProperty(index, 'image_url')}
                    className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                      step.image_url !== undefined ? 'bg-indigo-500 text-white shadow-md' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    🖼️ Imagem {step.image_url !== undefined ? '✓' : ''}
                  </button>
                </div>

                {step.hint !== undefined && (
                  <div className='bg-blue-900/20 p-3 rounded'>
                    <label className='block text-blue-300 font-medium mb-1'>💡 Dica:</label>
                    <input
                      type='text'
                      value={step.hint}
                      onChange={(e) => handleUpdateStep(index, { ...step, hint: e.target.value })}
                      className='text-blue-200 w-full bg-blue-900/30 rounded p-2'
                      placeholder='Digite a dica aqui...'
                    />
                  </div>
                )}

                {step.item !== undefined && (
                  <div className='bg-green-900/20 p-3 rounded'>
                    <label className='block text-green-300 font-medium mb-2'>🎒 Itens:</label>
                    {step?.item?.map((item, i) => (
                      <div key={i} className='flex gap-2 mb-2'>
                        <input
                          type='text'
                          value={item}
                          onChange={(e) => {
                            const newItems = [...step.item!]
                            newItems[i] = e.target.value
                            handleUpdateItems(index, newItems)
                          }}
                          className='text-gray-300 flex-1 bg-gray-700/30 rounded p-2'
                          placeholder='Nome do item...'
                        />
                        <button onClick={() => handleRemoveItem(index, i)} className='bg-red-500 hover:bg-red-600 text-white px-3 rounded transition-colors'>
                          🗑️
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleUpdateItems(index, [...(step.item || []), ''])}
                      className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mt-2 transition-colors'
                    >
                      + Adicionar Item
                    </button>
                  </div>
                )}

                {step.note !== undefined && (
                  <div className='bg-yellow-900/20 p-3 rounded'>
                    <label className='block text-yellow-300 font-medium mb-1'>📝 Nota:</label>
                    <input
                      type='text'
                      value={step.note}
                      onChange={(e) => handleUpdateStep(index, { ...step, note: e.target.value })}
                      className='text-yellow-200 w-full bg-yellow-900/30 rounded p-2'
                      placeholder='Digite a nota aqui...'
                    />
                  </div>
                )}

                {step.benefit !== undefined && (
                  <div className='bg-green-900/20 p-3 rounded'>
                    <label className='block text-green-300 font-medium mb-1'>✨ Benefício:</label>
                    <input
                      type='text'
                      value={step.benefit}
                      onChange={(e) => handleUpdateStep(index, { ...step, benefit: e.target.value })}
                      className='text-green-200 w-full bg-green-900/30 rounded p-2'
                      placeholder='Digite o benefício aqui...'
                    />
                  </div>
                )}

                {step.advice !== undefined && (
                  <div className='bg-purple-900/20 p-3 rounded'>
                    <label className='block text-purple-300 font-medium mb-1'>🔮 Recomendação:</label>
                    <input
                      type='text'
                      value={step.advice}
                      onChange={(e) => handleUpdateStep(index, { ...step, advice: e.target.value })}
                      className='text-purple-200 w-full bg-purple-900/30 rounded p-2'
                      placeholder='Digite a recomendação aqui...'
                    />
                  </div>
                )}

                {step.image_url !== undefined && (
                  <div className='bg-indigo-900/20 p-3 rounded'>
                    <label className='block text-indigo-300 font-medium mb-1'>🖼️ Imagem:</label>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleImageSelect(index, file)
                        }
                      }}
                      className='text-indigo-200 w-full bg-indigo-900/30 rounded p-2'
                    />
                    {(pendingImages[index]?.preview || step.image_url) && (
                      <div className='mt-2'>
                        <img src={pendingImages[index]?.preview || step.image_url} alt={step.title} className='max-h-40 rounded-lg shadow-lg' />
                      </div>
                    )}
                  </div>
                )}

                <div className='flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-600'>
                  <button onClick={() => handleFinishStepEditing(index)} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors w-full sm:w-auto'>
                    ✅ Concluir Edição
                  </button>
                  <button
                    onClick={() => handleRemoveStep(index)}
                    className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded
                    transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-500/30
                    transform hover:scale-105 active:scale-95
                    font-medium
                    border border-red-400/30 hover:border-red-300/40
                    backdrop-blur-sm bg-opacity-90
                    focus:outline-none focus:ring-2 focus:ring-red-500/50
                    w-full sm:w-auto'
                  >
                    🗑️ Excluir Passo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-8 flex justify-center'>
          <button
            onClick={handleAddStep}
            className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg 
            transition-all duration-300 flex items-center gap-2
            shadow-md hover:shadow-lg hover:shadow-blue-500/30
            transform hover:scale-105 hover:-translate-y-0.5 active:translate-y-0
            font-medium
            border border-blue-400/30 hover:border-blue-300/40
            backdrop-blur-sm bg-opacity-90
            focus:outline-none focus:ring-2 focus:ring-blue-500/50
            group w-full sm:w-auto'
          >
            <span className='text-lg group-hover:rotate-12 transition-transform duration-300'>➕</span>
            Adicionar Novo Passo
          </button>
        </div>
      </div>

      <button
        className='fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-full 
        transition-all duration-300 flex items-center gap-2
        shadow-lg hover:shadow-xl hover:shadow-green-500/30
        transform hover:scale-110 hover:-translate-y-1 active:translate-y-0
        font-medium text-sm
        border border-green-400/30 hover:border-green-300/40
        backdrop-blur-sm bg-opacity-90
        focus:outline-none focus:ring-2 focus:ring-green-500/50
        group z-50'
        onClick={handleCreateGuide}
      >
        <span className='text-lg group-hover:rotate-12 transition-transform duration-300'>💾</span>
        Criar Guia
      </button>

      <Footer />
    </div>
  )
}
