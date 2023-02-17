import { PET, PET2, PET3 } from '../../data/petmock';
import { PetsRepository } from '../../services/repository/pets.repo';

export const mockPet1 = PET;
mockPet1.id = '000001';
export const mockPet2 = PET2;
mockPet2.id = '000002';
export const mockPets = [mockPet1, mockPet2];
export const mockAddPet = PET3;
mockAddPet.id = '000003';
export const mockUpdatePet = { ...mockPet2, name: 'Update Pet' };

export const mockValidRepoResponse = () => {
    (PetsRepository.prototype.load as jest.Mock).mockResolvedValue(mockPets);
    (PetsRepository.prototype.create as jest.Mock).mockResolvedValue(
        mockAddPet
    );
    (PetsRepository.prototype.update as jest.Mock).mockResolvedValue(
        mockUpdatePet
    );
    (PetsRepository.prototype.delete as jest.Mock).mockResolvedValue(
        mockPet1.id
    );
};

const error = new Error('Testing errors');
export const mockNoValidRepoResponse = () => {
    (PetsRepository.prototype.load as jest.Mock).mockRejectedValue(error);
    (PetsRepository.prototype.create as jest.Mock).mockRejectedValue(error);
    (PetsRepository.prototype.update as jest.Mock).mockRejectedValue(error);
    (PetsRepository.prototype.delete as jest.Mock).mockRejectedValue(error);
};
