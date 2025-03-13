export interface Report {
    title: string
    type: string
    doctor: string
    date: string
    image: string
    hospital: string
    summary?: string
    additionalDetails: {
      [key: string]: string | string[]
    }
  }
  
  


