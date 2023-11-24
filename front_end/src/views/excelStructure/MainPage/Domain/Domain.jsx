import React from 'react'
import './domain.css'

const Domain = () => {
    return (
        <div className='main-domain'>
            <div className='title'>
                Activités et domaines de compétences
            </div>
            <div className="horizontal-bar"></div>
            <div className='domain-el'>
                <div className='domain-element'>
                    <div className="rectangle">
                        <div className='first-number'>
                            01
                        </div>
                    </div>
                    <div className='title-domain'>
                        Béton armé
                    </div>
                    <div className='desc-domain'>
                        Experts en béton armé à Marseille, nous concevons, calculons et construisons des structures durables, conformes aux normes et optimisées pour une efficacité maximale.                    </div>
                </div>


                <div className='domain-element'>
                    <div className="rectangle">
                        <div className='number'>
                            02
                        </div>
                    </div>
                    <div className='title-domain'>
                        Structure métallique
                    </div>
                    <div className='desc-domain'>
                        Spécialistes en structures métalliques, nous concevons et construisons des ouvrages robustes. Notre équipe compétente assure des résultats fiables et durables.                    </div>
                </div>

                <div className='domain-element'>
                    <div className="rectangle">
                        <div className='number'>
                            03
                        </div>
                    </div>
                    <div className='title-domain'>
                        Structure en bois
                    </div>
                    <div className='desc-domain'>
                        Nous maîtrisons l'art des structures en bois, créant des ouvrages durables et esthétiques. Conception et construction expertes pour vos projets boisés.                    </div>
                </div>

            </div>


        </div>
    )
}

export default Domain
