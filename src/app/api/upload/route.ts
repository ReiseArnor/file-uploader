import * as os from "oci-objectstorage";
import * as common from "oci-common";

export async function POST(req: any) {
    const form = await req.formData();
    const file = form.get('file');
    try {
        const provider = getAuthProvider();
        const osClient = new os.ObjectStorageClient({ authenticationDetailsProvider: provider });

        const putObjectRequest = await getPutObjectRequest(file);
        const putObjectResponse = await osClient.putObject(putObjectRequest);

        console.log(putObjectResponse);
        return Response.json({ ok: true })
    } catch (error) {
        return Response.json({ error: (error as any).message })
    }
}

const getAuthProvider = () => {
    const tenancy: string = process.env.OCI_TENANCY_ID || "";
    const user: string = process.env.OCI_USER_ID || "";
    const fingerprint: string = process.env.OCI_FINGERPRINT || "";
    const privateKey: string = process.env.OCI_PRIVATE_KEY || "";
    const passphrase = null; // optional parameter
    const region: common.Region = common.Region.US_PHOENIX_1;

    const provider = new common.SimpleAuthenticationDetailsProvider(
        tenancy,
        user,
        fingerprint,
        privateKey,
        passphrase,
        region
    );

    return provider;
}

const getPutObjectRequest = async (file: File) => {
    const putObjectRequest: os.requests.PutObjectRequest = {
        namespaceName: process.env.OCI_BUCKET_NAMESPACE || "",
        bucketName: process.env.OCI_BUCKET_NAME || "",
        putObjectBody: await getBuffer(file),
        objectName: file.name,
    };

    return putObjectRequest;
}

const getBuffer = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
}
