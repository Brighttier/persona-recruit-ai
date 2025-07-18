
import { NextRequest, NextResponse } from 'next/server';
import { withAuth, withRole } from '@/middleware/auth';
import { withRateLimit } from '@/middleware/security';
import { handleApiError } from '@/lib/errors';
import { resumeProcessingService } from '@/services/resumeProcessing.service';

/**
 * POST /api/upload/resume - DEPRECATED
 * This endpoint has been replaced by the more comprehensive /api/candidates/resume-process
 * Kept for backward compatibility if needed, but should not be used for new implementations.
 */
export const POST = withRateLimit('upload',
  withAuth(
    withRole(['candidate'], async (request: NextRequest): Promise<NextResponse> => {
      try {
        const userId = request.user!.id;
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
          return NextResponse.json(
            { error: 'Resume file is required' },
            { status: 400 }
          );
        }

        const result = await resumeProcessingService.processResume({
          userId,
          file,
          skipEmbeddings: false
        });

        if (!result.success) {
          return NextResponse.json(
            { error: result.error, warnings: result.warnings },
            { status: 400 }
          );
        }

        return NextResponse.json({
          success: true,
          data: {
            resumeUrl: result.data!.resumeUrl,
            fileName: result.data!.fileName,
            hasTextExtraction: !!result.data!.extractedText,
            hasEmbeddings: result.data!.hasEmbeddings,
            vectorSearchEnabled: result.data!.hasEmbeddings,
            processingSteps: result.data!.processingSteps
          },
          warnings: result.warnings,
          message: 'Resume uploaded and processed successfully with AI'
        });

      } catch (error) {
        return handleApiError(error);
      }
    })
  )
);
