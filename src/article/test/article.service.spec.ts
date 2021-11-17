import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, getRepositoryToken } from '@nestjs/typeorm';
import { ArticleService } from "@app/article/article.service";
import { ArticleEntity } from "@app/shared/db/entities/article/article.entity";

describe('ArticleService', () => {
  let articleService: ArticleService;


  const mockArticlesResponse = {
    articles: [],
    articlesCount: 1
  };

  const mockArticleEntity = {
    id: 1,
    slug: "how-to-train-your-dragon-kvicc0",
    title: "How to train your dragon",
    description: "Ever wonder how? #ALEXq1 #feden #qwe #feden",
    body: "",
    createdAt: "2021-11-17T11:53:26.578Z",
    updatedAt: "2021-11-17T11:53:26.578Z",
    tagList: [],
    favoritesCount: 0,
    author: {
      id: 2,
      username: "fek",
      email: "fedekn@gmail.com",
      bio: "",
      image: ""
    }
  }

  const mockQuery = {}

  const mockUserId = 1;

  const mockArticleService = {

  }

  const mockArticleRepository = {
    save: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: ArticleService,
          useValue: mockArticleService,
        },
        {
          provide: getRepositoryToken(ArticleEntity),
          useValue: mockArticleRepository,
        },
      ],
    }).compile();

    articleService = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(articleService).toBeDefined();
  });

  // describe('findAll', () => {
  //   describe('when getting all articles', () => {
  //     it('should return array of articles', async () => {
  //
  //
  //       expect(await articleService.findAll(mockUserId, mockQuery)).toEqual(mockArticlesResponse);
        // expect(mockReviewRepository.findAllReviews).toHaveBeenCalledTimes(1);
      // });

      // it('should to throw error when something went wrong', async () => {
      //   mockReviewRepository.findAllReviews.mockReturnValue(
      //     Promise.reject(new Error('Error in method')),
      //   );
      //
      //   await expect(reviewService.findAll()).rejects.toThrowError(
      //     'Error in method',
      //   );
      //
      //   expect(mockReviewRepository.findAllReviews).toHaveBeenCalledTimes(1);
      // });
    // });
  // });
  describe('findBySlug', () => {
    describe('when get one article by slug', () => {
      it("should return success", async () => {
        mockArticleRepository.save.mockReturnValue(Promise.resolve(mockArticleEntity))

        expect(await articleService.findBySlug('')).toEqual(mockArticleEntity)
      });
    })
  })
});
