export default function PostingRequestCompletePage() {
	return (
		<div className="min-h-screen bg-linear-to-b from-[#f8b819] to-[#f0d320] px-5 py-15">
			<div className="mx-auto flex w-full max-w-155 flex-col items-center gap-10 rounded-[20px] bg-white px-5 pb-10 pt-15">
				<h1 className="text-center text-[28px] font-bold text-black">
					応募完了
				</h1>
				<p className="text-center text-[18px] text-black">
					求人の申請が完了しました。
					<br />
					ご協力いただき、誠にありがとうございます。
					<br />
					内容を確認の上、掲載可否についてご連絡いたします。
				</p>
			</div>
		</div>
	);
}
